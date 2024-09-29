'use strict'

const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const { uploadDisk } = require('../../configs/multer.config');
const router = express.Router();

// router.use(authentication)

router.post('', uploadDisk.single('file'), asyncHandler(uploadController.uploadFile));
router.post('/multiple', uploadDisk.array('files', 5), asyncHandler(uploadController.uploadFiles));
router.delete('/:id', asyncHandler(uploadController.deleteFile));
router.delete('/multiple', asyncHandler(uploadController.deleteFiles));

module.exports = router;