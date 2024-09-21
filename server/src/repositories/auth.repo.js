'use strict'

const User = require('../models/user.model');
const TempUser = require('../models/tempUser.model');

const findByUsername = async ({ username, select = { password: 1, name: 1, email: 1, phone: 1, address: 1, role: 1, isOtpVerified: 1 } }) => {
    return await User.findOne({ username }).select(select).lean();
}

const findTempUserByUsername = async ({ username }) => {
    return await TempUser.findOne({ username });
}

const deleteTempUserById = async (id) => {
    return await TempUser.deleteOne({ _id: id});
}

const findUserById = async (id) => {
    return await User.findById(id);
}

module.exports = {
    findByUsername,
    findTempUserByUsername,
    deleteTempUserById,
    findUserById,
}