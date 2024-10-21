'use strict'

const User = require('../models/user.model');
const { findByUsername } = require('../repositories/auth.repo');
const { updateUserById } = require('../repositories/user.repo');
const { getInfoData } = require('../utils');

class UserService {

    static getInfoUser = async ({ username }) => {
        const foundUser = await findByUsername({ username });
        const user = getInfoData({ fields: ['_id', 'username', 'name', 'email', 'phone', 'avatar', 'address', 'role'], object: foundUser});
        return user;
    }

    static updateInfoUser = async (id, payload) => {
        const updatedUser = await updateUserById({ id, payload });
        const user = getInfoData({ fields: ['_id', 'username', 'name', 'email', 'phone', 'avatar', 'address', 'role'], object: updatedUser});
        return user;
    }

}

module.exports = UserService;