'use strict'

const express = require('express');
const userController = require('../../controllers/user.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.get('/', asyncHandler(userController.getInfoUser));
router.patch('/', asyncHandler(userController.updateInfoUser));

router.use(checkRole('admin'))

router.get('/all', asyncHandler(userController.getAllUserByAdmin));
router.patch('/update', asyncHandler(userController.updateStatusUserByAdmin));
router.get('/search/:keySearch', asyncHandler(userController.searchUser));
router.post('/add', asyncHandler(userController.addNewUser));

module.exports = router;