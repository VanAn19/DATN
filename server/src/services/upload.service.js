'use strict'

const cloudinary = require('../configs/cloudinary.config');

// upload from url image
const uploadImageFromUrl = async () => {
    
}

// upload image from local
const uploadImageFromLocal = async ({ path, folderName = 'product/8409' }) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            public_id: 'thumb',
            folder: folderName
        });
        return {
            imageUrl: result.secure_url,
            thumbUrl: await cloudinary.url(result.public_id, {
                height: 100,
                width: 100,
                format: 'jpg'
            })
        }
    } catch (error) {
        console.error('Error uploading image: ', error);
    }
}

// upload images from local
const uploadImagesFromLocal = async ({ files, folderName = 'product/8409' }) => {
    try {
        if (!files.length) return;
        const uploadedUrls = []
        for (const file of files) {        
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName
            });
            uploadedUrls.push({
                imageUrl: result.secure_url,
                thumbUrl: await cloudinary.url(result.public_id, {
                    height: 100,
                    width: 100,
                    format: 'jpg'
                })
            });
        }
        return uploadedUrls;
    } catch (error) {
        console.error('Error uploading image: ', error);
    }
}

module.exports = {
    uploadImageFromLocal,
    uploadImagesFromLocal
}