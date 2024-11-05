'use strict'

const Favorite = require('../models/favorites.model');

const getUserFavorite = async (userId) => {
    return await Favorite.findOne({ user: userId }).populate('products');
}

const addProductToFavorites = async (userId, productId) => {
    return await Favorite.findOneAndUpdate(
        { user: userId },
        { $addToSet: { products: productId } },
        { upsert: true, new: true }
    );
}

const removeProductFromFavorites = async (userId, productId) => {
    return await Favorite.updateOne(
        { user: userId },
        { $pull: { products: productId } }
    );
}

module.exports = {
    getUserFavorite,
    addProductToFavorites,
    removeProductFromFavorites
}