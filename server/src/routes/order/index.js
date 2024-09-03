'use strict'

const express = require('express');
const orderController = require('../../controllers/order.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.post('/review', asyncHandler(orderController.checkoutReview));
router.post('/order', asyncHandler(orderController.orderByUser));


module.exports = router;