'use strict'

const Category = require('../models/category.model');
const { findCategoryByName, getListCategory, updateCategoryById, getCategoryById, deleteCategoryById, searchCategory } = require('../repositories/category.repo');
const { BadRequestError, NotFoundError } = require('../core/error.response');

class CategoryService {

    static createCategory = async (payload) => {
        const { name } = payload;
        const category = await findCategoryByName({ name });
        if (category) throw new BadRequestError('Category exists');
        return await Category.create({ name });
    }

    static updateCategory = async (id, payload) => {
        const { name } = payload;
        const foundCategory = await findCategoryByName({ name });
        if (foundCategory) throw new BadRequestError('Category name exists');
        return await updateCategoryById({ id, payload });
    }

    static deleteCategory = async ({ id }) => {
        return await deleteCategoryById({ id });
    }

    static getListCategory = async () => {
        return await getListCategory();
    }

    static async getACategory({ id }) {
        return await getCategoryById({ id });
    }

    static async searchCategory({ keySearch }) {
        return await searchCategory({ keySearch });
    }

}

module.exports = CategoryService