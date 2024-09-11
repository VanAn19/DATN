'use strict'

const OTP = require('../models/otp.model');

const createOTP = async ({ userId, otp, expiredAt }) => {
    const newOTP = new OTP({ userId, otp, expiredAt });
    return await newOTP.save();
}

const findOTPByUserAndCode = async (userId, otp) => {
    return await OTP.findOne({ userId, otp });
}

module.exports = {
    createOTP,
    findOTPByUserAndCode
};