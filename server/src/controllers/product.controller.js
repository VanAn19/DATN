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

}

module.exports = new ProductController();