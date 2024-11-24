'use strict'

const express = require('express');
const statisticController = require('../../controllers/statistic.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.use(checkRole('admin'))

router.get('/product', asyncHandler(statisticController.statisticByProduct));

module.exports = router;