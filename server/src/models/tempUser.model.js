'use strict'

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'TempUser';
const COLLECTION_NAME = 'TempUsers';

var userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        maxLength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    otp: {
        type: String,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, userSchema);