'use strict'

const express = require('express');
const commentController = require('../../controllers/comment.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.get('/:id', asyncHandler(commentController.findCommentByProductId));

router.use(authentication)

router.post('/upload', asyncHandler(commentController.uploadCommentByUser));
router.patch('/update/:id', asyncHandler(commentController.updateCommentByUser));
router.delete('/:id', asyncHandler(commentController.deleteComment));

module.exports = router;