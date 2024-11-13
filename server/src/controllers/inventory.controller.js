'use strict'

const { SuccessResponse } = require('../core/success.response');
const InventoryService = require('../services/inventory.service');

class InventoryController {
    
    addStockToInventory = async (req,res,next) => {
        new SuccessResponse({
            message: 'Add stock to inventory successfully',
            metadata: await InventoryService.addStockToInventory(req.body)
        }).send(res);
    }

    getStockAndSoldQuantity = async (req,res,next) => {
        new SuccessResponse({
            message: 'Get stock successfully',
            metadata: await InventoryService.getStockAndSoldQuantity()
        }).send(res);
    }

    searchStock = async (req,res,next) => {
        new SuccessResponse({
            message: 'search stock successfully',
            metadata: await InventoryService.searchStock(req.params)
        }).send(res);
    }

    getSoldQuantity = async (req,res,next) => {
        new SuccessResponse({
            message: 'Get sold quantity product successfully',
            metadata: await InventoryService.getSoldQuantity()
        }).send(res);
    }
    
}

module.exports = new InventoryController();