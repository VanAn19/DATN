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

const removeInventory = async ({ productId }) => {
    return await Inventory.deleteOne({ productId });
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
    return await Inventory.find()
        .sort({ updatedAt: -1 })
        .populate('productId')
        .lean()
        .exec()
}

const searchStockByAdmin = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch, 'i');
    // const results = await Inventory.aggregate([
    //     {
    //         $lookup: {
    //             from: 'Products', // collection
    //             localField: 'productId',
    //             foreignField: '_id',
    //             as: 'product'
    //         }
    //     },
    //     { $unwind: '$product' }, // tách array product để truy cập trường bên trong
    //     {
    //         $match: {
    //             $or: [
    //                 { 'product.name': regexSearch }, 
    //             ]
    //         }
    //     }
    // ]);
    // return results;

    const results = await Inventory.find()
        .populate({
            path: 'productId',
            match: { name: regexSearch }, 
            select: 'name thumbnail'
        })
        .sort({ updatedAt: -1 })
        .lean()
        .exec();

    return results.filter(item => item.productId);
}

module.exports = {
    insertInventory,
    removeInventory,
    reservationInventory,
    releaseInventory,
    getStockAndSoldQuantity,
    searchStockByAdmin
}