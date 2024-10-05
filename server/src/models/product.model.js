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
    images: [{
        publicId: { type: String, required: true },
        imageUrl: { type: String, required: true },
        thumbUrl: { type: String, required: true }
    }],
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        required: true,
    },
    sellingPrice: {
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

// create index for search
productSchema.index({
    name: 'text',
    // description: 'text'
});

productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Post-save hook to update slug with ID
productSchema.post('save', async function(doc) {
    if (!doc.slug.includes(doc._id)) {
        const updatedSlug = `${slugify(doc.name, { lower: true })}.${doc._id}`;
        await model(DOCUMENT_NAME).findByIdAndUpdate(doc._id, { slug: updatedSlug });
    }
});

module.exports = model(DOCUMENT_NAME, productSchema);