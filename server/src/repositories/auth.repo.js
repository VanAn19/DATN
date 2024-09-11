'use strict'

const User = require('../models/user.model');

const findByUsername = async ({ username, select = { password: 1, name: 1, dateOfBirth: 1, email: 1, phone: 1, address: 1, role: 1 } }) => {
    return await User.findOne({ username }).select(select).lean();
}

const findUserById = async (id) => {
    return await User.findById(id);
}

module.exports = {
    findByUsername,
    findUserById
}