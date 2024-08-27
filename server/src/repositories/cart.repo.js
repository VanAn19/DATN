'use strict'

const Cart = require('../models/cart.model');

const createCart = async ({ userId, product }) => {
    const query = { user: userId, status: 'active' },
    updateOrInsert = {
        $addToSet: {
            products: product
        }
    }, options = { upsert: true, new: true }
    return await Cart.findOneAndUpdate(query, updateOrInsert, options);
}

const updateCartQuantity = async ({ userId, product }) => {
    const { productId, quantity } = product;
    const query = { user: userId, 'products.productId': productId, status: 'active' },
    updateSet = {
        $inc: {
            'products.$.quantity': quantity
        }
    }, options = { upsert: true, new: true }
    return await Cart.findOneAndUpdate(query, updateSet, options);
}

const findCartById = async (cartId) => {
    return await Cart.findOne({ _id: cartId, status: 'active' }).lean();
}

module.exports = {
    createCart,
    updateCartQuantity,
    findCartById
}