'use strict'

const Order = require('../models/order.model');

const getOrder = async ({ query, limit, skip }) => {
    return await Order.find(query)
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const getOneOrder = async ({ id, userId }) => {
    return await Order.findOne({ _id: id, user: userId });
}

module.exports = {
    getOrder,
    getOneOrder
}