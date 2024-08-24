'use strict'

const { model, Schema, Types } = require('mongoose');
const slugify = require('slugify');

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

var productSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    slug: String,
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
        select: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = model(DOCUMENT_NAME, productSchema);