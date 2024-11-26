'use strict'

const User = require('../models/user.model');
const TempUser = require('../models/tempUser.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { BadRequestError, AuthFailureError, ForbiddenError, NotFoundError } = require("../core/error.response");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { findByUsername, deleteTempUserById, findTempUserByUsername, findUserByEmail, findUserById } = require('../repositories/auth.repo');
const { generateAndSendOTP, verifyOTP } = require('./otp.service');
const { sendLinkResetPassword } = require('../utils/emailUtil');

class AuthService {

    static handlerRefreshToken = async ({ refreshToken, user, keyStore }) => {
        const { userId, username } = user;
        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyById(userId);
            throw new ForbiddenError('Something wrong happened! Please relogin');
        }
        if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('User is not registered');
        const foundShop = await findByUsername({ username });
        const tokens = await createTokenPair({ userId: foundShop._id, username }, keyStore.publicKey, keyStore.privateKey);
        await keyStore.updateOne({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        });
        return {
            user,
            tokens
        }
    }

    static logout = async (keyStore) => {
        console.log("keyStore::::", keyStore);
        return await KeyTokenService.removeKeyById(keyStore._id);
    }

    static login = async({ username, password, refreshToken = null }) => {
        const foundUser = await findByUsername({ username });
        if (!foundUser) throw new BadRequestError('User is not registered');
        if (!foundUser.isOtpVerified) throw new BadRequestError('Bạn cần xác minh OTP trước khi đăng nhập');
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) throw new AuthFailureError('Authentication error');
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        const tokens = await createTokenPair({ userId: foundUser._id, username, role: foundUser.role }, publicKey, privateKey);
        await KeyTokenService.createKeyToken({
            userId: foundUser._id,
            refreshToken: tokens.refreshToken,
            publicKey,
            privateKey
        });
        return {
            user: getInfoData({ fields: ['_id', 'username', 'name', 'email', 'phone', 'avatar', 'address', 'role'], object: foundUser}),
            tokens
        }
    }

    static signUp = async ({ username, password, name, email, phone, address }) => {
        const holderUser = await findByUsername({ username });
        if (holderUser) throw new BadRequestError('Username already registered!');
        const passwordHash = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiredAt = new Date(Date.now() + 5 * 60000);
        const newTempUser = await TempUser.create({ username, password: passwordHash, name, email, phone, address, otp, expiredAt });
        await generateAndSendOTP(newTempUser, otp); 
        return {
            user: getInfoData({ fields: ['_id', 'username', 'name', 'email', 'phone', 'avatar', 'address', 'role'], object: newTempUser}),
        };
    }

    static verifySignUp = async (username, otp) => {
        const tempUser = await findTempUserByUsername({ username });
        if (!tempUser) throw new BadRequestError('Người dùng không tồn tại');
        const isValidOtp = await verifyOTP(tempUser._id, otp);
        if (!isValidOtp) throw new BadRequestError('OTP không hợp lệ hoặc đã hết hạn');
        const newUser = await User.create({
            username: tempUser.username,
            password: tempUser.password,
            name: tempUser.name,
            email: tempUser.email,
            phone: tempUser.phone,
            address: tempUser.address,
            role: tempUser.role,
            isOtpVerified: true
        });
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        const tokens = await createTokenPair({ userId: newUser._id, username: newUser.username, role: newUser.role }, publicKey, privateKey);
        await KeyTokenService.createKeyToken({
            userId: newUser._id,
            refreshToken: tokens.refreshToken,
            publicKey,
            privateKey
        });
        await deleteTempUserById(tempUser._id);
        return {
            user: getInfoData({ fields: ['_id', 'username', 'name', 'email', 'phone', 'avatar', 'address', 'role'], object: newUser}),
            tokens
        };
    }

    static resendOtp = async (username) => {
        const tempUser = await findTempUserByUsername({ username });
        if (!tempUser) throw new BadRequestError('Người dùng không tồn tại');
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiredAt = new Date(Date.now() + 5 * 60000);
        await TempUser.updateOne({ username }, { otp, expiredAt });
        await generateAndSendOTP(tempUser, otp);
        return;
    }

    static forgotPassword = async ({ email }) => {
        const user = await findUserByEmail({ email });
        if (!user) throw new BadRequestError('Not found email');
        const resetToken = user.createPasswordChangedToken();
        await user.save();
        const resetUrl = `${process.env.URL_CLIENT}/reset-password/${resetToken}`;
        console.log("Reset URL:", resetUrl);
        const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href='${resetUrl}'>Click here</a>`
        const data = { email, html };
        const rs = await sendLinkResetPassword(data);
        return rs
    }

    static resetPassword = async ({ password, token }) => {
        const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
        if (!user) throw new BadRequestError('Invalid reset token');
        const passwordHash = await bcrypt.hash(password, 10);
        user.password = passwordHash
        user.passwordResetToken = undefined
        user.passwordChangedAt = Date.now()
        user.passwordResetExpires = undefined
        await user.save()
        return user
    }

    static changePassword = async ({ userId, currentPassword, newPassword }) => {
        const foundUser = await findUserById(userId);
        if (!foundUser) throw new BadRequestError("You do not have access");
        const match = await bcrypt.compare(currentPassword, foundUser.password);
        if (!match) throw new AuthFailureError('Authentication error');
        const passwordHash = await bcrypt.hash(newPassword, 10);
        foundUser.password = passwordHash;
        await foundUser.save();
        return foundUser;
    }

}

module.exports = AuthService;