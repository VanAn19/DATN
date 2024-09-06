'use strict'

const Inventory = require('../models/inventory.model');

const insertInventory = async ({ productId, stock, location = 'unknown' }) => {
    return await Inventory.create({
        productId,
        stock,
        location
    });
}

const reservationInventory = async ({ productId, quantity, cartId }) => {
    const query = {
        productId,
        stock: { $gte: quantity }
    }, updateSet = {
        $inc: {
            stock: -quantity
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

const releaseInventory = async ({ productId, quantity, cartId }) => {
    const query = { productId }, updateSet = {
        $inc: {
            stock: quantity
        },
        // $pull: {
        //     reservations: {
        //         cartId
        //     }
        // }
    }, options = { upsert: true, new: true }
    return await Inventory.updateOne(query, updateSet, options);
}

module.exports = {
    insertInventory,
    reservationInventory,
    releaseInventory
}