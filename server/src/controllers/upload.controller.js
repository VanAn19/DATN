'use strict'

const { BadRequestError } = require('../core/error.response');
const { SuccessResponse } = require('../core/success.response');
const { uploadImageFromLocal, uploadImagesFromLocal, deleteImage, deleteImages } = require('../services/upload.service');

class UploadController {
    
    uploadFile = async (req,res,next) => {
        const { file } = req;
        if (!file) {
            throw new BadRequestError('File missing');
        }
        new SuccessResponse({
            message: 'upload successfully',
            metadata: await uploadImageFromLocal({
                path: file.path
            })
        }).send(res);
    }

    uploadFiles = async (req,res,next) => {
        const { files } = req;
        if (!files.length) {
            throw new BadRequestError('File missing');
        }
        new SuccessResponse({
            message: 'upload successfully',
            metadata: await uploadImagesFromLocal({
                files
            })
        }).send(res);
    }

    deleteFile = async (req, res, next) => {
        const publicId = req.params.id;
        if (!publicId) {
            throw new BadRequestError('Public ID missing');
        }
        new SuccessResponse({
            message: 'Delete successfully',
            metadata: await deleteImage({ publicId })
        }).send(res);
    }

    deleteFiles = async (req, res, next) => {
        const { publicIds } = req.body;
        if (!publicIds || !publicIds.length) {
            throw new BadRequestError('Public IDs missing');
        }
        new SuccessResponse({
            message: 'Delete successfully',
            metadata: await deleteImages(publicIds)
        }).send(res);
    }
    
}

module.exports = new UploadController();