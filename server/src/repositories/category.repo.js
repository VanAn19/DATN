'use strict'

const Category = require('../models/category.model');
const Product = require('../models/product.model');

const findCategoryByName = async ({ name }) => {
    return await Category.findOne({ name }).lean();
}

const getListCategory = async () => {
    return await Category.aggregate([
        {
            $lookup: {
                from: Product.collection.name, 
                localField: '_id', 
                foreignField: 'category', 
                as: 'products' 
            }
        },
        {
            $project: {
                name: 1,
                slug: 1,
                productCount: { $size: '$products' }, 
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
    .sort({ updatedAt: -1 })
    .exec();
}

const updateCategoryById = async ({ id, payload, isNew = true }) => {
    return await Category.findByIdAndUpdate(id, payload, { new: isNew });
}

const getCategoryById = async ({ id }) => {
    return await Category.findById(id).lean();
}

const deleteCategoryById = async ({ id }) => {
    return await Category.deleteOne({ _id: id });
}

module.exports = {
    findCategoryByName,
    getListCategory,
    updateCategoryById,
    getCategoryById,
    deleteCategoryById
}