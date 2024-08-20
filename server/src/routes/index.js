'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// check api
router.use(apiKey);
// check permission
router.use(permission('0000'));

router.use('/v1/api/category', require('./category'));
router.use('/v1/api', require('./auth'));

module.exports = router;