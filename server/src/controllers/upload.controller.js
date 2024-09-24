'use strict'

const { BadRequestError } = require('../core/error.response');
const { SuccessResponse } = require('../core/success.response');
const { uploadImageFromLocal, uploadImagesFromLocal } = require('../services/upload.service');

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
    
}

module.exports = new UploadController();