'use strict'

const { BadRequestError } = require('../core/error.response');
const Inventory = require('../models/inventory.model');
const { getProductById } = require('../repositories/product.repo');

class InventoryService {

    static async addStockToInventory({ stock, productId, location }) {
        const product = await getProductById({ id: productId });
        if (!product) throw new BadRequestError('Product doesnt exist');
        const query = {
            productId: productId
        }, updateSet = {
            $inc: {
                stock: stock
            },
            $set: {
                location: location
            }
        }, options = { upsert: true, new: true }
        return await Inventory.findOneAndUpdate(query, updateSet, options);
    }

}

module.exports = InventoryService