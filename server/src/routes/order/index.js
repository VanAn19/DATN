'use strict'

const express = require('express');
const orderController = require('../../controllers/order.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.post('/review', asyncHandler(orderController.checkoutReview));
router.post('/order', asyncHandler(orderController.orderByUser));
router.post('/cancel/:id', asyncHandler(orderController.cancelOrderByUser));
router.get('/:id', asyncHandler(orderController.getOneOrderByUser));
router.get('/', asyncHandler(orderController.getOrderByUser));

router.use(checkRole('admin', 'employee'))

router.get('/admin/getOrderByAdmin', asyncHandler(orderController.getOrderByAdmin));
router.get('/getOneOrderByAdmin/:id', asyncHandler(orderController.getOneOrderByAdmin));
router.post('/update', asyncHandler(orderController.updateStatusOrderByAdmin));
router.get('/search/:keySearch', asyncHandler(orderController.searchOrderByAdmin));

module.exports = router;