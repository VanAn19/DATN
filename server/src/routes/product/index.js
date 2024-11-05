'use strict'

const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.get('/:id', asyncHandler(productController.getAProduct));
router.get('/published/all', asyncHandler(productController.getAllPublishedProduct));
router.post('/filter', asyncHandler(productController.filterProductByCategory));
router.get('/search/:keySearch', asyncHandler(productController.searchProduct));

router.use(authentication)

router.use(checkRole('admin'))

router.post('/create', asyncHandler(productController.createProduct));
router.post('/publish/:id', asyncHandler(productController.publishProduct));
router.post('/unpublish/:id', asyncHandler(productController.unPublishProduct));
router.get('/drafts/all', asyncHandler(productController.getAllDraftProduct));
router.patch('/update/:id', asyncHandler(productController.updateProduct));
router.delete('/delete/:id', asyncHandler(productController.deleteProduct));


module.exports = router;