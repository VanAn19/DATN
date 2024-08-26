'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response");
const Cart = require('../models/cart.model');
const { createCart, updateCartQuantity } = require("../repositories/cart.repo");
const { getProductById } = require('../repositories/product.repo');

/*
    1 - add product to cart
    2 - reduce product quantity
    3 - increase product quantity
    4 - get list to cart
    5 - delete cart
    6 - delete cart item
*/

class CartService {

    static async addToCart({ userId, product = {} }) {
        const userCart = await Cart.findOne({ user: userId, status: 'active' });
        if (!userCart) {
            return await createCart({ userId, product });
        }
        const productExists = userCart.products.some(p => p.productId === product.productId);
        if (productExists) {
            return await updateCartQuantity({ userId, product });
        } else {
            userCart.products.push(product);
            return await userCart.save();
        }
    }

    static async updateCartItemQuantity({ userId, products }) {
        const { productId, quantity, oldQuantity } = products[0];
        const foundProduct = await getProductById({ id: productId });
        if (!foundProduct) throw new NotFoundError('Not found products in cart');
        if (quantity === 0) {

        }
        return await updateCartQuantity({
            userId,
            product: {
                productId,
                quantity: quantity - oldQuantity
            }
        });
    }
    
    static async deleteUserCartItem({ userId, productId }) {
        const query = { user: userId, status: 'active' },
        updateSet = {
            $pull: {
                products: { productId }
            }
        }
        const deleteCart = await Cart.updateOne(query, updateSet);
        return deleteCart
    }

    static async getListUserCart({ userId }) {
        return await Cart.findOne({ user: userId }).lean()
    }

}

module.exports = CartService