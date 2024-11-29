'use strict'

const User = require('../models/user.model');
const TempUser = require('../models/tempUser.model');

const findByUsername = async ({ username, select = { username: 1, password: 2, name: 1, email: 1, phone: 1, address: 1, avatar: 1, role: 1, isOtpVerified: 1, activeTime: 1, status: 1 } }) => {
    return await User.findOne({ username }).select(select);
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

const findUserByEmail = async ({ email }) => {
    return await User.findOne({ email });
}

const findAllUser = async () => {
    return await User.find();
}

const searchUserByAdmin = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch, 'i');
    const results = await User.find({
        $or: [
            { name: regexSearch },
            { username: regexSearch },
            { email: regexSearch },
        ]
    }).lean();
    console.log('Search results:', results);
    return results;
}

module.exports = {
    findByUsername,
    findTempUserByUsername,
    deleteTempUserById,
    findUserById,
    findUserByEmail,
    findAllUser,
    searchUserByAdmin
}