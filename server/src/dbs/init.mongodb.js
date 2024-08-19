'use strict'

const mongoose = require('mongoose');
const connectString = `mongodb://127.0.0.1/knife`;
const { countConnect } = require('../helpers/check.connect');


class Database {
    constructor() {
        this.connect();
    }
    connect(type = 'mongodb') {
        if (1===1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connectString)
            .then(_ => console.log(`Connected MongoDB successfully`, countConnect()))
            .catch(err => console.log(`Connnect MongoDB failure`))
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb