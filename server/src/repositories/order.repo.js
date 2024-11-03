'use strict'

const Order = require('../models/order.model');
const { Types } = require('mongoose');

const getOrder = async ({ query, limit, skip }) => {
    return await Order.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const getOrderByAdmin = async ({ limit, skip }) => {
    return await Order.find({})
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const getOneOrder = async ({ id, userId }) => {
    return await Order.findOne({ _id: id, user: userId });
}

const getOneOrderByAdmin = async ({ id }) => {
    return await Order.findById(id);
}

const searchOrderByAdmin = async ({ keySearch }) => {
    // const regexSearch = new RegExp(keySearch, 'i');
    // const idCondition = Types.ObjectId.isValid(keySearch) ? { _id: new Types.ObjectId(keySearch) } : null;
    // const results = await Order.find({
    //     $or: [
    //         idCondition,
    //         { trackingNumber: regexSearch }
    //     ].filter(Boolean)
    // }).lean();
    // return results;
    const results = await Order.aggregate([
        {
            $addFields: {
                idString: { $toString: "$_id" } 
            }
        },
        {
            $match: {
                $or: [
                    { idString: { $regex: keySearch, $options: 'i' } }, 
                    { trackingNumber: { $regex: keySearch, $options: 'i' } }
                ]
            }
        }
    ]);
    return results;
}

module.exports = {
    getOrder,
    getOrderByAdmin,
    getOneOrder,
    getOneOrderByAdmin,
    searchOrderByAdmin
}