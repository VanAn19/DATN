'use strict'

const Inventory = require('../models/inventory.model');

const insertInventory = async ({ productId, stock, location = 'unknown', soldQuantity = 0 }) => {
    return await Inventory.create({
        productId,
        stock,
        location,
        soldQuantity
    });
}

const reservationInventory = async ({ productId, quantity, cartId }) => {
    const query = {
        productId,
        stock: { $gte: quantity }
    }, updateSet = {
        $inc: {
            stock: -quantity,
            soldQuantity: +quantity
        },
        $push: {
            reservations: {
                quantity,
                cartId,
                createdOn: new Date()
            }
        }
    }, options = { upsert: true, new: true }
    return await Inventory.updateOne(query, updateSet, options);
}

const releaseInventory = async ({ productId, quantity }) => {
    const query = { productId }, updateSet = {
        $inc: {
            stock: quantity,
            soldQuantity: -quantity
        },
        // $pull: {
        //     reservations: {
        //         cartId
        //     }
        // }
    }, options = { upsert: true, new: true }
    return await Inventory.updateOne(query, updateSet, options);
}

const getStockAndSoldQuantity = async () => {
    return Inventory.find()
        .sort({ updatedAt: -1 })
        .lean()
        .exec()
}

module.exports = {
    insertInventory,
    reservationInventory,
    releaseInventory,
    getStockAndSoldQuantity
}