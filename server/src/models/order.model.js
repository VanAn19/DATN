'use strict'

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

// Sub-schema for Checkout
const checkoutSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    freeShip: {
        type: Number,
        default: 0
    },
    totalCheckout: {
        type: Number,
        required: true
    }
}, { _id: false });

// Sub-schema for Address
const addressSchema = new Schema({
    province: {
        type: String,
        // required: true
    },
    district: {
        type: String,
        // required: true
    },
    ward: {
        type: String,
        // required: true
    },
    street: {
        type: String,
        // required: true
    }
}, { _id: false });

// Sub-schema for Payment
const paymentSchema = new Schema({
    method: {
        type: String,
        enum: ['creditCard', 'cash', 'bankTransfer'],
        required: true
    },
    details: {
        cardNumber: {
            type: String,
            required: function () { return this.method === 'creditCard'; }
        },
        expirationDate: {
            type: String,
            required: function () { return this.method === 'creditCard'; }
        },
        cardName: {
            type: String,
            required: function () { return this.method === 'creditCard'; }
        },
        bankName: {
            type: String,
            required: function () { return this.method === 'bankTransfer'; }
        },
        transactionId: {
            type: String,
            required: function () { return this.method === 'bankTransfer'; }
        }
    }
}, { _id: false });

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    /*
        totalPrice,
        totalApplyDiscount,
        freeShip
    */ 
    // checkout: {
    //     type: Object,
    //     default: {}
    // },
    checkout: checkoutSchema, 
    /*
        province,
        district, 
        ward,
        street
    */ 
    // shipping: {
    //     type: Object,
    //     default: {}
    // },
    address: addressSchema,
    /*
        method,
        details,
    */ 
    // payment: {
    //     type: Object,
    //     default: {}
    // },
    payment: paymentSchema,
    products: {
        type: Array,
        required: true 
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