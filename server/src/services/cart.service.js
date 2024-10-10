'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response");
const Cart = require('../models/cart.model');
const { createCart, updateCartQuantity, findCartByUserId } = require("../repositories/cart.repo");
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
        const userCart = await findCartByUserId(userId);
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

    static async increaseQuantityCartItem({ productId, userId }) {
        const userCart = await findCartByUserId(userId);
        if (!userCart) throw new BadRequestError('Cart not found');
        const productExists = userCart.products.some(p => p.productId === productId);
        if (!productExists) throw new NotFoundError('Not found product in cart');
        return await updateCartQuantity({
            userId,
            product: {
                productId,
                quantity: 1
            }
        });
    }

    static async decreaseQuantityCartItem({ productId, userId }) {
        const userCart = await findCartByUserId(userId);
        if (!userCart) throw new BadRequestError('Cart not found');
        const productExists = userCart.products.find(p => p.productId === productId);
        if (!productExists) throw new NotFoundError('Not found product in cart');
        console.log("productExists:::::::", productExists)
        // quantity = 1 => xóa luôn sản phẩm
        if (productExists.quantity === 1) {
            return await this.deleteUserCartItem({ userId, productId });
        }
        return await updateCartQuantity({
            userId,
            product: {
                productId,
                quantity: -1
            }
        });
    }

}

module.exports = CartService