'use strict'

const express = require('express');
const categoryController = require('../../controllers/category.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.use(checkRole('admin'))

router.post('/create', asyncHandler(categoryController.createCategory));


module.exports = router;