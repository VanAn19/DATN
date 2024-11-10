'use strict'

const { BadRequestError } = require('../core/error.response');
const Product = require('../models/product.model');
const { insertInventory } = require('../repositories/inventory.repo');
const { 
    findProductByName,
    findProductByNameExcludeId,
    updateProductById,
    findAllDraftProduct,
    findAllPublishProduct,
    publishProduct,
    unPublishProduct,
    deleteProductById,
    getProductById,
    searchProductByUser,
    filterProductByCategory,
    getRandomProducts
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
        const { name, thumbnail, images, description, price, sale, quantity, category, isDraft } = payload;
        const product = await findProductByName({ name });
        if (product) throw new BadRequestError('Product name exists');
        const newProduct = await Product.create({
            name,
            thumbnail,
            images,
            description,
            price,
            sale,
            sellingPrice: price - (price * sale / 100),
            quantity,
            category,
            isDraft,
            isPublished: !isDraft
        });
        if (newProduct.isPublished) {
            await insertInventory({
                productId: newProduct._id,
                stock: quantity
            })
        }
        return newProduct 
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
        const { name } = payload;
        const foundProduct = await findProductByNameExcludeId({ name, id });
        if (foundProduct) throw new BadRequestError('Product name exists');
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

    static async filterProductByCategory({ category, limit = 50, skip = 0 }) {
        return await filterProductByCategory({ category, limit, skip });
    }

    static async getRandomProducts(id) {
        return await getRandomProducts(id);
    }

    static async deleteProduct({ id }) {
        return await deleteProductById({ id });
    }

    static async searchProduct({ keySearch }) {
        return await searchProductByUser({ keySearch });
    }
    
}

module.exports = ProductService;