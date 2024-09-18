'use strict'

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { BadRequestError, AuthFailureError, ForbiddenError, NotFoundError } = require("../core/error.response");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { findByUsername, findUserById } = require('../repositories/auth.repo');
const { generateAndSendOTP, verifyOTP } = require('./otp.service');

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
            user: getInfoData({ fields: ['_id', 'name', 'email', 'avatar'], object: foundUser}),
            tokens
        }
    }

    static signUp = async ({ username, password, name, dateOfBirth, email, phone, address }) => {
        const holderUser = await findByUsername({ username });
        if (holderUser) throw new BadRequestError('Error: Username already registered!');
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: passwordHash, name, dateOfBirth, email, phone, address });
        if (newUser) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            await generateAndSendOTP(newUser, otp);
        }
        return {
            user: getInfoData({ fields: ['id', 'name', 'email'], object: newUser}),
        };
    }

    static verifySignUp = async (userId, otp) => {
        const isValidOtp = await verifyOTP(userId, otp);
        if (!isValidOtp) throw new BadRequestError('OTP không hợp lệ hoặc đã hết hạn');
        const user = await findUserById(userId);
        if (!user) throw new BadRequestError('Người dùng không tồn tại');
        user.isOtpVerified = true;
        await user.save();
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        const tokens = await createTokenPair({ userId: user._id, username: user.username, role: user.role }, publicKey, privateKey);
        await KeyTokenService.createKeyToken({
            userId: user._id,
            refreshToken: tokens.refreshToken,
            publicKey,
            privateKey
        });
        return {
            user: getInfoData({ fields: ['id', 'name', 'email'], object: user}),
            tokens
        };
    }

}

module.exports = AuthService;