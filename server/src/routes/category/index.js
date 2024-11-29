'use strict'

const express = require('express');
const categoryController = require('../../controllers/category.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication, checkRole } = require('../../auth/authUtils');
const router = express.Router();

router.get('/', asyncHandler(categoryController.getListCategory));

router.use(authentication)

router.use(checkRole('admin', 'employee'))

router.post('/create', asyncHandler(categoryController.createCategory));
router.get('/:id', asyncHandler(categoryController.getACategory));
router.patch('/update/:id', asyncHandler(categoryController.updateCategory));
router.delete('/delete/:id', asyncHandler(categoryController.deleteCategory));

module.exports = router;