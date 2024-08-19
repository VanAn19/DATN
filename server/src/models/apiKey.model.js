'use strict'

const { model, Schema, Types } = require('mongoose'); 

const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys';

var apiKeySchema = new Schema({
    key: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    permissions: {
        type: [String],
        require: true,
        enum: ['0000','1111','2222']  
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = model(DOCUMENT_NAME, apiKeySchema);