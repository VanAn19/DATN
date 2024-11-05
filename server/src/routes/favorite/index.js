'use strict'

const express = require('express');
const favoriteController = require('../../controllers/favorite.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication)

router.get('/', asyncHandler(favoriteController.getUserFavorites));
router.post('/add', asyncHandler(favoriteController.addProductToFavorite));
router.post('/remove', asyncHandler(favoriteController.removeProductFromFavorite));

module.exports = router;