'use strict'

const UserService = require('../services/user.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class UserController {

    getInfoUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'Get info user success',
            metadata: await UserService.getInfoUser({ username: req.user.username })
        }).send(res);
    }

    updateInfoUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'update info user success',
            metadata: await UserService.updateInfoUser(req.user.userId, req.body)
        }).send(res);
    }

    getAllUserByAdmin = async (req,res,next) => {
        new SuccessResponse({
            message: 'get all user success',
            metadata: await UserService.getAllUserByAdmin()
        }).send(res);
    }

    updateStatusUserByAdmin = async (req,res,next) => {
        new SuccessResponse({
            message: 'update status user successfully ',
            metadata: await UserService.updateStatusUserByAdmin(req.body)
        }).send(res);
    }

    searchUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'search user successfully',
            metadata: await UserService.searchUserByAdmin(req.params)
        }).send(res);
    }

    addNewUser = async (req,res,next) => {
        new SuccessResponse({
            message: 'add new user by admin successfully',
            metadata: await UserService.addNewUserByAdmin(req.body)
        }).send(res);
    }

}

module.exports = new UserController();