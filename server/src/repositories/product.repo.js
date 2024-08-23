'use strict'

const Product = require('../models/product.model');

const queryProduct = async ({ query, limit, skip }) => {
    return await Product.find(query).populate('category')
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const findAllDraftProduct = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const findAllPublishProduct = async () => {
    return await queryProduct({ query, limit, skip });
}

const findProductByName = async ({ name }) => {
    return await Product.findOne({ name }).lean();
}

const publishProduct = async ({ id }) => {
    const foundProduct = await Product.findById(id);
    console.log("foundProduct::::::", foundProduct);
    if (!foundProduct) return null;
    foundProduct.isDraft = false;
    foundProduct.isPublished = true;
    const { modifiedCount } = await foundProduct.updateOne(foundProduct);
    return modifiedCount;
}

const unPublishProduct = async ({ id }) => {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) return null;
    foundProduct.isDraft = true;
    foundProduct.isPublished = false;
    const { modifiedCount } = await foundProduct.updateOne(foundProduct);
    return modifiedCount;
}

const updateProductById = async ({ productId, payload, isNew = true }) => {
    return await Product.findByIdAndUpdate(productId, payload, { new: isNew });
}

module.exports = {
    findProductByName,
    updateProductById,
    findAllDraftProduct,
    findAllPublishProduct,
    publishProduct,
    unPublishProduct
}