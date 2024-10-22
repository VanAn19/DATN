'use strict'

const Product = require('../models/product.model');
const { insertInventory, removeInventory } = require('./inventory.repo');
const { Types } = require('mongoose')

const queryProduct = async ({ query, limit, skip }) => {
    return await Product.find(query).populate('category')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const findAllDraftProduct = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const findAllPublishProduct = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip });
}

const filterProductByCategory = async ({ category, limit, skip }) => {
    const query = { isPublished: true, category: new Types.ObjectId(category) }
    return await queryProduct({ query, limit, skip });
}

const getProductById = async ({ id }) => {
    return await Product.findById(id).lean();
}

const findProductByName = async ({ name }) => {
    return await Product.findOne({ name }).lean();
}

const findProductByNameExcludeId = async ({ name, id }) => {
    return await Product.findOne({ name, _id: { $ne: id } }).lean();
}

const publishProduct = async ({ id }) => {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) return null;
    foundProduct.isDraft = false;
    foundProduct.isPublished = true;
    const { modifiedCount } = await foundProduct.updateOne(foundProduct);
    await insertInventory({
        productId: id,
        stock: foundProduct.quantity
    });
    return modifiedCount;
}

const unPublishProduct = async ({ id }) => {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) return null;
    foundProduct.isDraft = true;
    foundProduct.isPublished = false;
    const { modifiedCount } = await foundProduct.updateOne(foundProduct);
    await removeInventory({ productId: id });
    return modifiedCount;
}

const updateProductById = async ({ id, payload, isNew = true }) => {
    return await Product.findByIdAndUpdate(id, payload, { new: isNew });
}

const deleteProductById = async ({ id }) => {
    await removeInventory({ productId: id });
    return await Product.deleteOne({ _id: id });
}

const searchProductByUser = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch, 'i');
    console.log('Searching for:', regexSearch);
    // const results = await Product.find({
    //     isPublished: true,
    //     $text: { $search: regexSearch },
    // }, { score: { $meta: 'textScore' } })
    // .sort({ score: { $meta: 'textScore' } })
    // .lean()
    const results = await Product.find({
        isPublished: true,
        $or: [
            { name: regexSearch },
        ]
    }).lean();
    console.log('Search results:', results);
    return results;
}

const checkProductByServer = async (products) => {
    return await Promise.all(products.map(async product => {
        const foundProduct = await getProductById({ id: product.productId });
        if (foundProduct) {
            return {
                price: foundProduct.sellingPrice,
                quantity: product.quantity,
                productId: product.productId,
                thumbnail: product.thumbnail,
                name: product.name
            }
        }
    }))
}

module.exports = {
    findProductByName,
    findProductByNameExcludeId,
    updateProductById,
    findAllDraftProduct,
    findAllPublishProduct,
    filterProductByCategory,
    getProductById,
    publishProduct,
    unPublishProduct,
    deleteProductById,
    searchProductByUser,
    checkProductByServer
}