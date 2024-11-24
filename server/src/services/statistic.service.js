'use strict'

const { BadRequestError } = require('../core/error.response');
const { getStockAndSoldQuantity } = require('../repositories/inventory.repo');

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

}

module.exports = StatisticService;