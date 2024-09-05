'use strict'

const { model, Schema } = require('mongoose');
const slugify = require('slugify');

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';

var categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: String
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = model(DOCUMENT_NAME, categorySchema);