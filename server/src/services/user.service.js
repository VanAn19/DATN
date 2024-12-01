'use strict'

const User = require('../models/user.model');
const { findByUsername, findAllUser, searchUserByAdmin, findUserByEmail } = require('../repositories/auth.repo');
const { updateUserById } = require('../repositories/user.repo');
const { getInfoData } = require('../utils');
const bcrypt = require('bcrypt');

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

    static async addNewUserByAdmin({ username, password, name, email, phone, role }) {
        const holderUser = await findByUsername({ username });
        if (holderUser) throw new BadRequestError('Tên đăng nhập đã được đăng ký!');
        const holderEmail = await findUserByEmail({ email });
        if (holderEmail) throw new BadRequestError('Email đã được đăng ký!');
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: passwordHash, name, email, phone, role });
        return {
            user: getInfoData({ fields: ['_id', 'username', 'name', 'email', 'phone', 'role'], object: newUser}),
        }
    }

}

module.exports = UserService;