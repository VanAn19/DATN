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

    getListCategory = async (req,res,next) => {
        new SuccessResponse({
            message: 'Get list category successfully!',
            metadata: await CategoryService.getListCategory()
        }).send(res);
    }

    updateCategory = async (req,res,next) => {
        new SuccessResponse({
            message: 'update a category successfully',
            metadata: await CategoryService.updateCategory(req.params.id, req.body)
        }).send(res);
    }

    getACategory = async (req,res,next) => {
        new SuccessResponse({
            message: 'get a Category successfully',
            metadata: await CategoryService.getACategory({ id: req.params.id })
        }).send(res);
    }

    deleteCategory = async (req,res,next) => {
        new SuccessResponse({
            message: 'delete category successfully',
            metadata: await CategoryService.deleteCategory({ id: req.params.id })
        }).send(res);
    }

    searchCategory = async (req,res,next) => {
        new SuccessResponse({
            message: 'search category successfully',
            metadata: await CategoryService.searchCategory(req.params)
        }).send(res);
    }

}

module.exports = new CategoryController();