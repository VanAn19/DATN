'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response");
const Comment = require('../models/comment.model');
const { findCommentByProductId, deleteCommentById, updateCommentByUser } = require("../repositories/comment.repo");

class CommentService {

    static async findCommentByProductId({ productId }) {
        return findCommentByProductId(productId);
    }

    static async uploadCommentByUser(payload) {
        const { user, product, content, images } = payload;
        const newComment = await Comment.create({
            user,
            product,
            content,
            images
        });
        return newComment;
    }

    static async updateCommentByUser(id, payload) {
        return await updateCommentByUser({ id, payload });
    }

    static async deleteCommentById({ id }) {
        return await deleteCommentById({ id });
    }

}

module.exports = CommentService;