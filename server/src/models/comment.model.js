'use strict'

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Comment'
const COLLECTION_NAME = 'Comments'

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: [{
        publicId: { type: String, required: true },
        imageUrl: { type: String, required: true },
        thumbUrl: { type: String, required: true }
    }]
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

commentSchema.path('images').default([])

module.exports = model(DOCUMENT_NAME, commentSchema);