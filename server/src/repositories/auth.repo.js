'use strict'

const User = require('../models/user.model');

const findByUsername = async ({ username, select = { password: 1, name: 1, dateOfBirth: 1, email: 1, phone: 1, address: 1 } }) => {
    return await User.findOne({ username }).select(select).lean();
}

module.exports = {
    findByUsername
}