'use strict'

const CategoryService = require('../services/category.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class CategoryController {

    createCategory = async (req,res,next) => {
        new CREATED({
            message: 'Create new category successfully!',
            metadata: await CategoryService.createCategory(req.body)
        }).send(res);
    }

}

module.exports = new CategoryController();