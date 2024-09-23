'use strict'

const express = require('express');
const authController = require('../../controllers/auth.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.post('/signup', asyncHandler(authController.signUp));
router.post('/verifyOTP', asyncHandler(authController.verifyOTP));
router.post('/resendOTP', asyncHandler(authController.resendOTP));
router.post('/login', asyncHandler(authController.login));

router.use(authentication)

router.post('/logout', asyncHandler(authController.logout));
router.post('/handlerRefreshToken', asyncHandler(authController.handlerRefreshToken));

module.exports = router;