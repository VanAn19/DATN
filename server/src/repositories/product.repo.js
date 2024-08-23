'use strict'

const Product = require('../models/product.model');

const findProductByName = async ({ name }) => {
    return await Product.findOne({ name }).lean();
}

const updateProductById = async ({ productId, payload, isNew = true }) => {
    return await Product.findByIdAndUpdate(productId, payload, { new: isNew });
}

module.exports = {
    findProductByName,
    updateProductById
}