'use strict'

const { model, Schema, Types } = require('mongoose');
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

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
        enum: ['user', 'employee', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    },
    activeTime: {
        type: Date,
        default: new Date()
    },
    isOtpVerified: {
        type: Boolean,
        default: false 
    },
    passwordChangedAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// create index for search
userSchema.index({
    name: 'text',
    username: 'text',
    email: 'text'
});

userSchema.methods = {
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(64).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

module.exports = model(DOCUMENT_NAME, userSchema);