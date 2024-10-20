'use strict'

const express = require('express');
const userController = require('../../controllers/user.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.get('/', asyncHandler(userController.getInfoUser));
router.patch('/', asyncHandler(userController.updateInfoUser));

module.exports = router;