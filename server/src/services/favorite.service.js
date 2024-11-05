'use strict'

const { BadRequestError } = require('../core/error.response');
const { getUserFavorite, addProductToFavorites, removeProductFromFavorites } = require('../repositories/favorite.repo');

class FavoriteService {

    static async getUserFavorites(userId) {
        return await getUserFavorite(userId);
    }

    static async addProductToFavorites({ userId, productId }) {
        return await addProductToFavorites(userId, productId);
    }

    static async removeProductFromFavorites({ userId, productId }) {
        return await removeProductFromFavorites(userId, productId);
    }

}

module.exports = FavoriteService;