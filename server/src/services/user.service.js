'use strict'

const User = require('../models/user.model');
const { findByUsername, findAllUser, searchUserByAdmin } = require('../repositories/auth.repo');
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

    static getAllUserByAdmin = async () => {
        return await findAllUser();
    }

    static updateStatusUserByAdmin = async ({ username, newStatus }) => {
        const allowedStatuses = ['active', 'disabled'];
        if (!allowedStatuses.includes(newStatus)) {
            throw new BadRequestError('Invalid status');
        }
        const foundUser = await findByUsername({ username });
        if (!foundUser) throw new BadRequestError('User not found');
        foundUser.status = newStatus;
        const updatedUser = await foundUser.save();
        return updatedUser;
    }

    static async searchUserByAdmin({ keySearch }) {
        return await searchUserByAdmin({ keySearch });
    }

}

module.exports = UserService;