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

module.exports = {
    findCategoryByName,
    getListCategory
}