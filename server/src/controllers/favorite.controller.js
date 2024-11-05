'use strict'

const FavoriteService = require('../services/favorite.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class FavoriteController {

    getUserFavorites = async (req,res,next) => {
        new SuccessResponse({
            message: 'get list favorite products successfully',
            metadata: await FavoriteService.getUserFavorites(req.user.userId)
        }).send(res);
    }

    addProductToFavorite = async (req,res,next) => {
        new SuccessResponse({
            message: 'get list favorite products successfully',
            metadata: await FavoriteService.addProductToFavorites({ userId: req.user.userId, ...req.body })
        }).send(res);
    }

    removeProductFromFavorite = async (req,res,next) => {
        new SuccessResponse({
            message: 'get list favorite products successfully',
            metadata: await FavoriteService.removeProductFromFavorites({ userId: req.user.userId, ...req.body })
        }).send(res);
    }

}

module.exports = new FavoriteController();