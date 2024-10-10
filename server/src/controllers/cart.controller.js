'use strict'

const { OK, CREATED, SuccessResponse } = require('../core/success.response');
const CartService = require('../services/cart.service');

class CartController {
    
    addToCart = async (req,res,next) => {
        new SuccessResponse({
            message: 'Create new cart successfully',
            metadata: await CartService.addToCart({ userId: req.user.userId, ...req.body })
        }).send(res)
    }

    updateCartItemQuantity = async (req,res,next) => {
        new SuccessResponse({
            message: 'Update cart successfully',
            metadata: await CartService.updateCartItemQuantity({ userId: req.user.userId, ...req.body })
        }).send(res)
    }

    deleteCartItem = async (req,res,next) => {
        new SuccessResponse({
            message: 'Delete cart successfully',
            metadata: await CartService.deleteUserCartItem({ userId: req.user.userId, productId: req.params.id })
        }).send(res)
    }

    listToCart = async (req,res,next) => {
        new SuccessResponse({
            message: 'List cart successfully',
            metadata: await CartService.getListUserCart({ userId: req.user.userId })
        }).send(res)
    }

    increaseQuantityCartItem = async (req,res,next) => {
        new SuccessResponse({
            message: 'increase quantity successfully',
            metadata: await CartService.increaseQuantityCartItem({ userId: req.user.userId, ...req.body })
        }).send(res)
    }

    decreaseQuantityCartItem = async (req,res,next) => {
        new SuccessResponse({
            message: 'increase quantity successfully',
            metadata: await CartService.decreaseQuantityCartItem({ userId: req.user.userId, ...req.body })
        }).send(res)
    }
}

module.exports = new CartController();