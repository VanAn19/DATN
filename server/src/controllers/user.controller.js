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

}

module.exports = new UserController();