'use strict'

const User = require('../models/user.model');

const updateUserById = async ({ id, payload, isNew = true }) => {
    return await User.findByIdAndUpdate(id, payload, { new: isNew });
}

module.exports = {
    updateUserById
}