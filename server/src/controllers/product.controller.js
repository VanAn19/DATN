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

}

module.exports = new ProductController();