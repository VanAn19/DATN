'use strict'

const Order = require('../models/order.model');

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

module.exports = {
    getOrder,
    getOrderByAdmin,
    getOneOrder,
    getOneOrderByAdmin
}