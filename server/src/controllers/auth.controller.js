'use strict'

const AuthService = require('../services/auth.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class AuthController {

    handlerRefreshToken = async (req,res,next) => {
        new SuccessResponse({
            message: 'Get token success',
            metadata: await AuthService.handlerRefreshToken({
                refreshToken: req.refreshToken,
                user: req.user,
                keyStore: req.keyStore
            })
        }).send(res);
    }

    logout = async (req,res,next) => {
        new SuccessResponse({
            message: 'Logout successfully',
            metadata: await AuthService.logout(req.keyStore)
        }).send(res);
    }

    login = async (req,res,next) => {
        new SuccessResponse({
            metadata: await AuthService.login(req.body)
        }).send(res);
    }

    signUp = async (req,res,next) => {
        new CREATED({
            message: 'Register OK! OTP has been sent',
            metadata: await AuthService.signUp(req.body)
        }).send(res);
    }

    verifyOTP = async (req, res, next) => {
        new SuccessResponse({
            message: 'Verify OTP success',
            metadata: await AuthService.verifySignUp(req.body.username, req.body.otp)
        }).send(res);
    }

    resendOTP = async (req,res,next) => {
        new SuccessResponse({
            message: 'Resend OTP success',
            metadata: await AuthService.resendOtp(req.body.username)
        }).send(res);
    }

    forgotPassword = async (req,res,next) => {
        new SuccessResponse({
            message: 'forgot password success',
            metadata: await AuthService.forgotPassword({ email: req.query.email })
        }).send(res);
    }

    resetPassword = async (req,res,next) => {
        new SuccessResponse({
            message: 'reset password success',
            metadata: await AuthService.resetPassword({ 
                password: req.body.password,
                token: req.body.token
            })
        }).send(res);
    }

    changePassword = async (req,res,next) => {
        new SuccessResponse({
            message: 'change password success',
            metadata: await AuthService.changePassword({ 
                userId: req.user.userId,
                ...req.body
            })
        }).send(res);
    }

}

module.exports = new AuthController();