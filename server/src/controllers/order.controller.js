'use strict'

const { SuccessResponse } = require('../core/success.response');
const OrderService = require('../services/order.service');

class OrderController {
    
    checkoutReview = async (req,res,next) => {
        new SuccessResponse({
            message: 'Checkout successfully ',
            metadata: await OrderService.checkoutReview({ userId: req.user.userId, ...req.body })
        }).send(res);
    }
    
    orderByUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'order successfully ',
            metadata: await OrderService.orderByUser({ userId: req.user.userId, ...req.body })
        }).send(res);
    }
}

module.exports = new OrderController();