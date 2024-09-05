'use strict'

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        require: true 
    },
    /*
        totalPrice,
        totalApplyDiscount,
        freeShip
    */ 
    checkout: {
        type: Object,
        default: {}
    },
    /*
        street,
        city,
        state,
        country
    */ 
    shipping: {
        type: Object,
        default: {}
    },
    payment: {
        type: Object,
        default: {}
    },
    products: {
        type: Array,
        require: true 
    },
    trackingNumber: {
        type: String,
        default: '#0000118052022'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'canceled', 'delivered'],
        default: 'pending'
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, orderSchema);