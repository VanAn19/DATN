'use strict'

const Category = require('../models/category.model');

const findCategoryByName = async ({ name }) => {
    return await Category.findOne({ name }).lean();
}

module.exports = {
    findCategoryByName
}