'use strict'

const cloudinary = require('../configs/cloudinary.config');

// upload from url image
const uploadImageFromUrl = async () => {
    
}

// upload image from local
const uploadImageFromLocal = async ({ path, folderName = 'products', fileName = null }) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            folder: folderName
        });
        return {
            publicId: result.public_id.split('/').pop(),
            imageUrl: result.secure_url,
            thumbUrl: await cloudinary.url(result.public_id, {
                height: 200,
                width: 300,
                format: 'jpg'
            })
        }
    } catch (error) {
        console.error('Error uploading image: ', error);
    }
}

// upload images from local
const uploadImagesFromLocal = async ({ files, folderName = 'products' }) => {
    try {
        if (!files.length) return;
        const uploadedUrls = []
        for (const file of files) {        
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderName
            });
            uploadedUrls.push({
                publicId: result.public_id.split('/').pop(),
                imageUrl: result.secure_url,
                thumbUrl: await cloudinary.url(result.public_id, {
                    height: 200,
                    width: 300,
                    format: 'jpg'
                })
            });
        }
        return uploadedUrls;
    } catch (error) {
        console.error('Error uploading image: ', error);
    }
}

const deleteImage = async ({ publicId }) => {
    try {
        const result = await cloudinary.uploader.destroy(`products/${publicId}`);
        return result;
    } catch (error) {
        console.error('Error deleting image: ', error);
    }
}

const deleteImages = async (publicIds) => {
    try {
        const deleteResults = [];
        for (const publicId of publicIds) {
            const result = await cloudinary.uploader.destroy(`products/${publicId}`);
            deleteResults.push(result);
        }
        return deleteResults;
    } catch (error) {
        console.error('Error deleting images: ', error);
    }
}

module.exports = {
    uploadImageFromLocal,
    uploadImagesFromLocal,
    deleteImage,
    deleteImages
}