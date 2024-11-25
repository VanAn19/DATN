'use strict'

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD
    },
    debug: true, 
    logger: true,
});

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.GMAIL_ACCOUNT,
        to: email,
        subject: 'Mã OTP xác nhận đăng ký',
        text: `Mã OTP của bạn là: ${otp}`
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Lỗi khi gửi OTP qua email:', error);
    }
}

const sendLinkResetPassword = async ({ email, html }) => {
    const info = await transporter.sendMail({
        from: 'Dao Trọng Bình <no-relply@daotrongbinh.vn>',
        to: email,
        subject: "Forgot password",
        html: html,
    });
    return info;
}

module.exports = {
    sendOTPEmail,
    sendLinkResetPassword
};