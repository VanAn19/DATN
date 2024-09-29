'use strict'

const Category = require('../models/category.model');

const findCategoryByName = async ({ name }) => {
    return await Category.findOne({ name }).lean();
}

const getListCategory = async () => {
    return Category.find()
        .sort({ updatedAt: -1 })
        .lean()
        .exec()
}

module.exports = {
    findCategoryByName,
    getListCategory
}