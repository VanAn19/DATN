'use strict'

const { model, Schema, Types } = require('mongoose'); 

const DOCUMENT_NAME = 'Otp';
const COLLECTION_NAME = 'Otps';

var otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        require: true
    },
    expiredAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, otpSchema);