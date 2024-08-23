'use strict'

const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.use(checkRole('admin'))

router.post('/create', asyncHandler(productController.createProduct));


module.exports = router;