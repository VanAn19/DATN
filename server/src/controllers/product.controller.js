'use strict'

const ProductService = require('../services/product.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class ProductController {

    createProduct = async (req,res,next) => {
        new CREATED({
            message: 'Create new Product successfully',
            metadata: await ProductService.createProduct(req.body)
        }).send(res);
    }

    publishProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'Publish product successfully',
            metadata: await ProductService.publishProduct({ id: req.params.id})
        }).send(res);
    }

    unPublishProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'Unpublish product successfully',
            metadata: await ProductService.unPublishProduct({ id: req.params.id})
        }).send(res);
    }

    getAllDraftProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'get all draft product successfully',
            metadata: await ProductService.findAllDraftProduct()
        }).send(res);
    }

    getAllPublishedProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'get all published product successfully',
            metadata: await ProductService.findAllPublishedProduct()
        }).send(res);
    }

    filterProductByCategory = async (req,res,next) => {
        new SuccessResponse({
            message: 'filter product by category successfully',
            metadata: await ProductService.filterProductByCategory({ category: req.body.category })
        }).send(res);
    }

    getAProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'get a product successfully',
            metadata: await ProductService.getAProduct({ id: req.params.id })
        }).send(res);
    }

    updateProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'update a product successfully',
            metadata: await ProductService.updateProduct(req.params.id, req.body)
        }).send(res);
    }

    deleteProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'delete product successfully',
            metadata: await ProductService.deleteProduct({ id: req.params.id })
        }).send(res);
    }

    searchProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'search product successfully',
            metadata: await ProductService.searchProduct(req.params)
        }).send(res);
    }

}

module.exports = new ProductController();