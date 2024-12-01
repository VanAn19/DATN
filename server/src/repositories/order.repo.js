'use strict'

const Order = require('../models/order.model');
const { Types } = require('mongoose');

const getOrder = async ({ query, limit, skip }) => {
    return await Order.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const getOrderByAdmin = async ({ limit, skip }) => {
    return await Order.find({})
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const getOneOrder = async ({ id, userId }) => {
    return await Order.findOne({ _id: id, user: userId });
}

const getOneOrderByAdmin = async ({ id }) => {
    return await Order.findById(id);
}

const searchOrderByAdmin = async ({ keySearch }) => {
    // const regexSearch = new RegExp(keySearch, 'i');
    // const idCondition = Types.ObjectId.isValid(keySearch) ? { _id: new Types.ObjectId(keySearch) } : null;
    // const results = await Order.find({
    //     $or: [
    //         idCondition,
    //         { trackingNumber: regexSearch }
    //     ].filter(Boolean)
    // }).lean();
    // return results;
    const results = await Order.aggregate([
        {
            $addFields: {
                idString: { $toString: "$_id" }
            }
        },
        {
            $match: {
                $or: [
                    { idString: { $regex: keySearch, $options: 'i' } },
                    { trackingNumber: { $regex: keySearch, $options: 'i' } }
                ]
            }
        }
    ]);
    return results;
}

const statisticRevenueByDate = async () => {
    const result = await Order.aggregate([
        // 1: Lọc đơn hàng có trạng thái không phải 'pending' và 'canceled'
        {
            $match: {
                status: { $nin: ['pending', 'canceled'] }
            }
        },
        // 2: Chuyển đổi thời gian "createdAt" thành ngày (không có giờ)
        {
            $project: {
                day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                checkout: 1,
                products: 1
            }
        },
        // 3: Giải nén mảng "products" cấp đầu tiên
        {
            $unwind: "$products"
        },
        // 4: Giải nén mảng "products" bên trong mỗi phần tử của "products"
        {
            $unwind: "$products.products"
        },
        // 5: Tính tổng doanh thu và tổng số lượng cho mỗi đơn hàng
        {
            $project: {
                day: 1,
                totalRevenue: "$checkout.totalCheckout",
                totalQuantity: "$products.products.quantity"
            }
        },
        // 6: Chuyển đổi "day" thành Date object để có thể sắp xếp chính xác
        {
            $addFields: {
                dayDate: { $dateFromString: { dateString: "$day" } }
            }
        },
        // 7: Nhóm theo ngày và tính tổng doanh thu, tổng số lượng
        {
            $group: {
                _id: "$dayDate",  // Nhóm theo ngày đã chuyển thành Date
                totalRevenue: { $sum: "$totalRevenue" },  // Tổng doanh thu của ngày đó
                totalQuantity: { $sum: "$totalQuantity" }  // Tổng số lượng của ngày đó
            }
        },
        // 8: Sắp xếp theo ngày giảm dần
        {
            $sort: { _id: -1 }  // Sắp xếp theo ngày giảm dần
        },
        // 9: Giới hạn số lượng bản ghi trả về
        {
            $limit: 15
        },
        // 10: Chuyển đổi lại _id thành ngày định dạng chuỗi
        {
            $project: {
                _id: { $dateToString: { format: "%d/%m/%Y", date: "$_id" } },
                totalRevenue: 1,
                totalQuantity: 1
            }
        }
    ]);
    return result;
}

module.exports = {
    getOrder,
    getOrderByAdmin,
    getOneOrder,
    getOneOrderByAdmin,
    searchOrderByAdmin,
    statisticRevenueByDate
}