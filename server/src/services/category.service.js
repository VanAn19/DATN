'use strict'

const Category = require('../models/category.model');
const { findCategoryByName, getListCategory } = require('../repositories/category.repo');
const { BadRequestError, NotFoundError } = require('../core/error.response');

class CategoryService {

    static createCategory = async (payload) => {
        const { name } = payload;
        const category = await findCategoryByName({ name });
        if (category) throw new BadRequestError('Category exists');
        return await Category.create({ name });
    }

    static updateCategory = async () => {
        
    }

    static deleteCategory = async () => {

    }

    static getListCategory = async () => {
        return await getListCategory();
    }

}

module.exports = CategoryService