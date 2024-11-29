'use strict'

const { BadRequestError } = require('../core/error.response');
const { getStockAndSoldQuantity } = require('../repositories/inventory.repo');
const Inventory = require('../models/inventory.model');

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
        const start = new Date(startDate);
        const end = new Date(endDate);

        const results = await Inventory.aggregate([
            {
                $match: {
                    "reservations.createdOn": { $gte: start, $lte: end }
                }
            },
            {
                $unwind: "$reservations" // Tách mảng `reservations` để tính toán
            },
            {
                $match: {
                    "reservations.createdOn": { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$reservations.createdOn" }
                    }, // Nhóm theo ngày
                    totalRevenue: {
                        $sum: {
                            $multiply: [
                                "$reservations.quantity",
                                "$productId.sellingPrice"
                            ]
                        }
                    },
                    totalSold: { $sum: "$reservations.quantity" } // Tổng số lượng bán trong ngày
                }
            },
            {
                $sort: { _id: 1 } // Sắp xếp theo ngày
            }
        ]);

        return results.map(item => ({
            date: new Date(item._id).toLocaleDateString('vi-VN'),
            totalRevenue: item.totalRevenue,
            totalSold: item.totalSold
        }));
    }

}

module.exports = StatisticService;