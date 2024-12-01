'use strict'

const express = require('express');
const statisticController = require('../../controllers/statistic.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.use(checkRole('admin', 'employee'))

router.get('/product', asyncHandler(statisticController.statisticByProduct));
router.get('/date/:startDate/:endDate', asyncHandler(statisticController.statisticByDateRange));
router.get('/revenueByDate', asyncHandler(statisticController.statisticRevenueByDate));

module.exports = router;