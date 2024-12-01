'use strict'

const { BadRequestError } = require('../core/error.response');
const { getStockAndSoldQuantity } = require('../repositories/inventory.repo');
const Order = require('../models/order.model');
const { statisticRevenueByDate } = require('../repositories/order.repo');

class StatisticService {

    static async statisticByProduct() {
        const inventories = await getStockAndSoldQuantity();
        if (!inventories) throw new BadRequestError("Not found product");
        const result = inventories.map((inventory) => {
            const totalRevenue = inventory.soldQuantity * inventory.productId.sellingPrice;
            return {
                _id: inventory.productId._id,
                name: inventory.productId.name,
                soldQuantity: inventory.soldQuantity,
                price: inventory.productId.sellingPrice,
                totalRevenue
            }
        });
        return result;
    }

    static async statisticByDateRange({ startDate, endDate }) {
        // Chuyển đổi ngày thành kiểu Date
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Kiểm tra nếu không hợp lệ
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new BadRequestError("Invalid date range");
        }

        const inventories = await getStockAndSoldQuantity();
        if (!inventories) throw new BadRequestError("Not found product");

        const result = inventories.map((inventory) => {
            // Lọc các reservations trong khoảng thời gian
            const reservationsInRange = inventory.reservations?.filter((reservation) => {
                const createdOn = new Date(reservation.createdOn);
                return createdOn >= start && createdOn <= end;
            });

            // Tính tổng số lượng đã bán và doanh thu
            const totalSoldInRange = reservationsInRange?.reduce((sum, r) => sum + r.quantity, 0) || 0;
            const totalRevenueInRange = totalSoldInRange * inventory.productId.sellingPrice;

            return {
                _id: inventory.productId._id,
                name: inventory.productId.name,
                soldQuantity: totalSoldInRange,
                price: inventory.productId.sellingPrice,
                totalRevenue: totalRevenueInRange
            }
        });

        return result.filter((item) => item.soldQuantity > 0); // Loại bỏ sản phẩm không có doanh thu trong khoảng
    }

    static async statisticRevenueByDate() {
        return await statisticRevenueByDate();
    }

}

module.exports = StatisticService;