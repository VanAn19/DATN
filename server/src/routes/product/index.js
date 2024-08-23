'use strict'

const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.use(checkRole('admin'))

router.post('/create', asyncHandler(productController.createProduct));
router.post('/publish/:id', asyncHandler(productController.publishProduct));
router.post('/unpublish/:id', asyncHandler(productController.unPublishProduct));


module.exports = router;