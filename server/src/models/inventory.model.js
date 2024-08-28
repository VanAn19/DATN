'use strict'

const { model, Schema, Types } = require('mongoose'); 

const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventories';

var inventorySchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    location: {
        type: String,
        default: 'unknown'
    },
    stock: {
        type: Number,
        required: true
    },
    reservations: {
        type: Array,
        default: []
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = model(DOCUMENT_NAME, inventorySchema)