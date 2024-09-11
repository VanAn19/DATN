'use strict'

const { BadRequestError } = require('../core/error.response');
const { createOTP, findOTPByUserAndCode } = require('../repositories/otp.repo');
const { sendOTPEmail } = require('../utils/emailUtil');

const generateAndSendOTP = async (user, otp) => {
    const expiredAt = new Date(Date.now() + 5 * 60000);
    await createOTP({ userId: user._id, otp, expiredAt });
    await sendOTPEmail(user.email, otp);
}

const verifyOTP = async (userId, otp) => {
    const otpRecord = await findOTPByUserAndCode(userId, otp);
    if (!otpRecord) throw new BadRequestError('OTP không hợp lệ');
    if (otpRecord.expiredAt < new Date()) throw new BadRequestError('OTP đã hết hạn');
    return true;
}

module.exports = {
    generateAndSendOTP,
    verifyOTP
};