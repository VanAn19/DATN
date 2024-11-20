'use strict'

const Comment = require('../models/comment.model');
const { Types } = require('mongoose');

const findCommentByProductId = async (productId) => {
    return await Comment.find({ product: new Types.ObjectId(productId) })
        .sort({ updatedAt: 1 })
        .populate('user')
        .lean()
        .exec()
}

const updateCommentByUser = async ({ id, payload, isNew = true }) => {
    return await Comment.findByIdAndUpdate(id, payload, { new: isNew });
}

const deleteCommentById = async ({ id }) => {
    return await Comment.deleteOne({ _id: id });
}

module.exports = {
    findCommentByProductId,
    updateCommentByUser,
    deleteCommentById
}