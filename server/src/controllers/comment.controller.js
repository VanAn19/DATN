'use strict'

const CommentService = require('../services/comment.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class CommentController {

    findCommentByProductId = async (req,res,next) => {
        new SuccessResponse({
            message: 'find comment by product successfully',
            metadata: await CommentService.findCommentByProductId({ productId: req.params.id })
        }).send(res);
    }

    findAllCommentByAdmin = async (req,res,next) => {
        new SuccessResponse({
            message: 'find all comment by admin successfully',
            metadata: await CommentService.getAllCommentByAdmin()
        }).send(res);
    }

    uploadCommentByUser = async (req,res,next) => {
        new CREATED({
            message: 'upload comment by user successfully',
            metadata: await CommentService.uploadCommentByUser({
                user: req.user.userId,
                ...req.body
            })
        }).send(res);
    }

    updateCommentByUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'update comment by user successfully',
            metadata: await CommentService.updateCommentByUser(req.params.id, req.body)
        }).send(res);
    }

    deleteComment = async (req,res,next) => {
        new SuccessResponse({
            message: 'delete comment successfully',
            metadata: await CommentService.deleteCommentById({ id: req.params.id })
        }).send(res);
    }

}

module.exports = new CommentController();