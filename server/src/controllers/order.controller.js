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

    getOrderByUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'get order successfully by user ',
            metadata: await OrderService.getOrderByUser({ userId: req.user.userId })
        }).send(res);
    }

    getOrderByAdmin = async (req,res,next) => {
        new SuccessResponse({
            message: 'get order successfully by admin ',
            metadata: await OrderService.getOrderByAdmin()
        }).send(res);
    }

    getOneOrderByUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'get one order successfully ',
            metadata: await OrderService.getOneOrderByUser({ id: req.params.id, userId: req.user.userId })
        }).send(res);
    }

    getOneOrderByAdmin = async (req,res,next) => {
        new SuccessResponse({
            message: 'get one order successfully ',
            metadata: await OrderService.getOneOrderByAdmin({ id: req.params.id })
        }).send(res);
    }

    cancelOrderByUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'cancel order successfully ',
            metadata: await OrderService.cancelOrderByUser({ orderId: req.params.id, userId: req.user.userId })
        }).send(res);
    }

    updateStatusOrderByAdmin = async (req,res,next) => {
        new SuccessResponse({
            message: 'cancel order successfully ',
            metadata: await OrderService.updateOrderStatusByAdmin(req.body)
        }).send(res);
    }
}

module.exports = new OrderController();