'use strict'

const { BadRequestError } = require("../core/error.response");
const { findCartById } = require("../repositories/cart.repo");
const { checkProductByServer } = require("../repositories/product.repo");
const { acquireLock, releaseLock } = require("./redis.service");

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
            console.log("checkProductServer:::::::::", checkProductServer);
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

    static async orderByUser() {

    }

}

module.exports = OrderService