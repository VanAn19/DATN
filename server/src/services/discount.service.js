'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response");
const Discount = require('../models/discount.model');

/*
    1 - Generator Discount Code [admin]
    2 - get discount amount [user]
    3 - get all discount codes [user | shop]
    4 - verify discount code [user] 
    5 - delete discount code [admin]
    6 - cancel discount code [user]
*/ 

class DiscountService {

    static async createDiscountCode(payload) {
        const {
            name, description, type, value, code, startDate, endDate, 
            maxUses, usesCount, usersUsed, maxUsesPerUser, 
            minOrderValue, isActive, appliesTo, productIds 
        } = payload
        if (new Date(startDate) >= new Date(endDate)) throw new BadRequestError('Start date must before end date');
        const foundDiscount = await Discount.findOne({ code }).lean();
        if (foundDiscount && foundDiscount.isActive) throw new BadRequestError('Discount exists');
        const newDiscount = await Discount.create({
            name: name,
            description: description,
            type: type,
            value: value,
            code: code,
            startDate: new Date(start_date),
            endDate: new Date(end_date),
            maxUses: maxUses,
            usesCount: usesCount,
            usersUsed: usersUsed,
            maxUsesPerUser: maxUsesPerUser,
            minOrderValue: minOrderValue || 0,
            shopId: shopId,
            isActive: isActive,
            appliesTo: appliesTo,
            productIds: appliesTo === 'all' ? [] : productIds
        });
        return newDiscount
    }

}

module.exports = DiscountService