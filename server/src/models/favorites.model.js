'use strict'

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Favorite';
const COLLECTION_NAME = 'Favorites';

var favoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        }
    ]
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

favoriteSchema.index({ user: 1, products: 1 }, { unique: true });

module.exports = model(DOCUMENT_NAME, favoriteSchema);