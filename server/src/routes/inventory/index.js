'use strict'

const express = require('express');
const inventoryController = require('../../controllers/inventory.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.get('/sold', asyncHandler(inventoryController.getSoldQuantity));

router.use(authentication)

router.use(checkRole('admin', 'employee'))

router.get('/search/:keySearch', asyncHandler(inventoryController.searchStock));
router.post('', asyncHandler(inventoryController.addStockToInventory));
router.get('', asyncHandler(inventoryController.getStockAndSoldQuantity));

module.exports = router;