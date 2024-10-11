'use strict'

const { BadRequestError } = require("../core/error.response");
const { findCartById, removeProductsFromCart } = require("../repositories/cart.repo");
const { checkProductByServer } = require("../repositories/product.repo");
const { acquireLock, releaseLock } = require("./redis.service");
const Order = require('../models/order.model');
const { getOrder, getOneOrder, getOrderByAdmin, getOneOrderByAdmin } = require("../repositories/order.repo");
const { releaseInventory } = require("../repositories/inventory.repo");

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

    static async orderByUser({ orderIds, cartId, userId, address, payment, name, phone }) {
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
            products: orderIdsNew,
            name,
            phone
        });
        // nếu create thành công, remove product có trong giỏ hàng 
        if (newOrder) {
            const productIds = products.map(product => product.productId);
            await removeProductsFromCart(cartId, productIds);
        }
        return newOrder;
    }

    static async getOrderByUser({ userId, limit = 50, skip = 0 }) {
        const query = { user: userId }
        return await getOrder({ query, limit, skip });
    }

    static async getOrderByAdmin({ limit = 50, skip = 0 } = {}) {
        return await getOrderByAdmin({ limit, skip });
    }

    static async getOneOrderByUser({ id, userId }) {
        return await getOneOrder({ id, userId });
    }

    static async getOneOrderByAdmin({ id }) {
        return await getOneOrderByAdmin({ id });
    }

    static async cancelOrderByUser({ orderId, userId }) {
        const foundOrder = await getOneOrder({ id: orderId, userId });
        if (!foundOrder) throw new BadRequestError('Order not found or not owned by user');
        // kiểm tra status (trường hợp shipped or delivered thì không thể hủy)
        if (foundOrder.status === 'shipped' || foundOrder.status === 'delivered') throw new BadRequestError('Order cannot be canceled as it has been shipped or delivered');
        // foundOrder.status = 'canceled';
        // const canceledOrder = await foundOrder.save();
        const canceledOrder = await Order.findOneAndUpdate(
            { _id: orderId, user: userId },
            { status: 'canceled' },
            { upsert: true, new: true }
        );
        // hoàn lại inventory
        const products = foundOrder.products.flatMap(order => order.products);
        for (let product of products) {
            await releaseInventory({ productId: product.productId, quantity: product.quantity });
        }
        return canceledOrder;
    }

    static async updateOrderStatusByAdmin({ orderId, newStatus }) {
        const allowedStatuses = ['pending', 'confirmed', 'shipped', 'canceled', 'delivered'];
        if (!allowedStatuses.includes(newStatus)) {
            throw new BadRequestError('Invalid status');
        }
        const foundOrder = await getOneOrderByAdmin({ id: orderId });
        if (!foundOrder) throw new BadRequestError('Order not found');
        // nếu đơn hàng bị hủy hoặc đơn hàng đã giao thành công thì không thay đổi được
        if (foundOrder.status === 'delivered' || foundOrder.status === 'canceled') {
            throw new BadRequestError('Cant update the order because it is already delivered or canceled');
        }
        foundOrder.status = newStatus;
        const updatedOrder = await foundOrder.save();
        return updatedOrder;
    }

}

module.exports = OrderService