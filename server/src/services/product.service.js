'use strict'

const { BadRequestError } = require('../core/error.response');
const Product = require('../models/product.model');
const { findProductByName } = require('../repositories/product.repo');

class ProductService {

    static createProduct = async (payload) => {
        const { name, thumbnail, description, price, quantity, category } = payload;
        const product = await findProductByName({ name });
        if (product) throw new BadRequestError('Product name exists');
        return await Product.create({
            name,
            thumbnail,
            description,
            price,
            quantity,
            category
        });
    }
    
}

module.exports = ProductService;