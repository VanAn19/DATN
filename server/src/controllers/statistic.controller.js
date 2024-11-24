'use strict'

const { SuccessResponse } = require('../core/success.response');
const StatisticService = require('../services/statistic.service');

class StatisticController {

    statisticByProduct = async (req,res,next) => {
        new SuccessResponse({
            message: 'Get statistic by product successfully',
            metadata: await StatisticService.statisticByProduct()
        }).send(res);
    }

}

module.exports = new StatisticController();