'use strict'

const express = require('express');
const cartController = require('../../controllers/cart.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.post('', asyncHandler(cartController.addToCart));
router.delete('/:id', asyncHandler(cartController.deleteCartItem));
router.post('/update', asyncHandler(cartController.updateCartItemQuantity));
router.get('', asyncHandler(cartController.listToCart));
router.post('/increase', asyncHandler(cartController.increaseQuantityCartItem));
router.post('/decrease', asyncHandler(cartController.decreaseQuantityCartItem));

module.exports = router;