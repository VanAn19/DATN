'use strict'

const Product = require('../models/product.model');

const findProductByName = async ({ name }) => {
    return await Product.findOne({ name }).lean();
}

module.exports = {
    findProductByName
}