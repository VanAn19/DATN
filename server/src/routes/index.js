'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// check api
router.use(apiKey);
// check permission
router.use(permission('0000'));

router.use('/v1/api/statistic', require('./statistic'));
router.use('/v1/api/comment', require('./comment'));
router.use('/v1/api/favorite', require('./favorite'));
router.use('/v1/api/profile', require('./profile'));
router.use('/v1/api/upload', require('./upload'));
router.use('/v1/api/order', require('./order'));
router.use('/v1/api/inventory', require('./inventory'));
router.use('/v1/api/cart', require('./cart'));
router.use('/v1/api/product', require('./product'));
router.use('/v1/api/category', require('./category'));
router.use('/v1/api', require('./auth'));

module.exports = router;