'use strict'

const { BadRequestError } = require("../core/error.response");
const { findCartById, removeProductsFromCart } = require("../repositories/cart.repo");
const { checkProductByServer } = require("../repositories/product.repo");
const { acquireLock, releaseLock } = require("./redis.service");
const Order = require('../models/order.model');

class OrderService {

    /*
        {
            cartId,
            userId, 
            orderIds: [
                {
                    products: [
                        {
                            price,
                            quantity,
                            productId
                        }
                    ]
                },
                {
                    products: [
                        {
                            price,
                            quantity,
                            productId
                        }
                    ]
                }
            ]
        }
    */ 
    static async checkoutReview({ cartId, userId, orderIds }) {
        const foundCart = await findCartById(cartId);
        if (!foundCart) throw new BadRequestError('Cart doesnt exist');
        const checkoutOrder = {
            totalPrice: 0, // tổng tiền hàng
            freeShip: 0, // phí ship
            totalCheckout: 0 // tổng thanh toán
        }, orderIdsNew = []
        // tính tổng tiền bill
        for (let i = 0; i < orderIds.length; i++) {
            const { products = [] } = orderIds[i];
            const checkProductServer = await checkProductByServer(products);
            if (!checkProductServer[0]) throw new BadRequestError('Order wrong');
            // tổng tiền đơn hàng
            const checkoutPrice = checkProductServer.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)
            // tổng tiền trước khi xử lý
            checkoutOrder.totalPrice += checkoutPrice
            const itemCheckout = {
                priceRaw: checkoutPrice,
                products: checkProductServer
            }
            // nếu có discount, check
            // ...
            // tổng thanh toán cuối cùng
            checkoutOrder.totalCheckout = checkoutOrder.totalPrice + checkoutOrder.freeShip;
            orderIdsNew.push(itemCheckout);
        }
        return {
            orderIds,
            orderIdsNew,
            checkoutOrder
        }
    }

    static async orderByUser({ orderIds, cartId, userId, address = {}, payment = {} }) {
        const { orderIdsNew, checkoutOrder } = await OrderService.checkoutReview({
            cartId,
            userId,
            orderIds
        });
        // check xem có vượt hàng tồn kho không
        const products = orderIdsNew.flatMap(order => order.products);
        const acquireProduct = []
        for (let i = 0; i < products.length; i++) {
            const { productId, quantity } = products[i];
            const keyLock = await acquireLock(productId, quantity, cartId);
            acquireProduct.push(keyLock ? true : false);
            if (keyLock) {
                await releaseLock(keyLock);
            }
        }
        // nếu có 1 sản phẩm hết hàng trong kho
        if (acquireProduct.includes(false)) {
            throw new BadRequestError('Một số sản phẩm đã được cập nhật, vui lòng quay lại giỏ hàng');
        }
        const newOrder = await Order.create({
            user: userId,
            checkout: checkoutOrder,
            shipping: address,
            payment: payment,
            products: orderIdsNew
        });
        // nếu create thành công, remove product có trong giỏ hàng 
        if (newOrder) {
            const productIds = products.map(product => product.productId);
            await removeProductsFromCart(cartId, productIds);
        }
        return newOrder;
    }

}

module.exports = OrderService