'use strict'

const { BadRequestError } = require('../core/error.response');
const Product = require('../models/product.model');
const { 
    findProductByName,
    updateProductById,
    findAllDraftProduct,
    findAllPublishProduct,
    publishProduct,
    unPublishProduct,
    deleteProductById,
    getProductById,
    searchProductByUser
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

    static async publishProduct({ id }) {
        return await publishProduct({ id });
    }

    static async unPublishProduct({ id }) {
        return await unPublishProduct({ id })
    }

    static async getAProduct({ id }) {
        return await getProductById({ id });
    }

    static async updateProduct(id, payload) {
        return await updateProductById({ id, payload });
    }

    static async findAllDraftProduct({ limit = 50, skip = 0 } = {}) {
        const query = { isDraft: true };
        return await findAllDraftProduct({ query, limit, skip });
    }

    static async findAllPublishedProduct({ limit = 50, skip = 0 } = {}) {
        const query = { isPublished: true };
        return await findAllPublishProduct({ query, limit, skip });
    }

    static async deleteProduct({ id }) {
        return await deleteProductById({ id });
    }

    static async searchProduct({ keySearch }) {
        return await searchProductByUser({ keySearch });
    }
    
}

module.exports = ProductService;