'use strict'

const { BadRequestError } = require('../core/error.response');
const Product = require('../models/product.model');
const { 
    findProductByName,
    updateProductById 
} = require('../repositories/product.repo');

class ProductService {

    constructor({ name, thumbnail, description, price, quantity, category }) {
        this.name = name
        this.thumbnail = thumbnail
        this.description = description
        this.price = price
        this.quantity = quantity
        this.category = category
    }

    static async createProduct(payload) {
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

    static async updateProduct(id, payload) {
        return await updateProductById({ id, payload });
    }
    
}

module.exports = ProductService;