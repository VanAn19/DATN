'use strict'

const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError, ForbiddenError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-token-id'
}

const createTokenPair = async (payload, publicKey, privatekey) => {
    try {
        const accessToken = await jwt.sign({ ...payload, role: payload.role}, publicKey, {
            expiresIn: '7d'
        });
        const refreshToken = await jwt.sign({ ...payload, role: payload.role}, privatekey, {
            expiresIn: '365d'
        });
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) console.error(`error verify::`, err);
            console.log(`decode verify::`, decode);
        });
        return { accessToken, refreshToken }
    } catch (error) {
        console.error(error);
    }
}

const authentication = asyncHandler(async (req,res,next) => {
    /*
        1 - check userId missing
        2 - get AT
        3 - verify token
        4 - check user in dbs
        5 - check keyStore with this userId
        6 - return next()
    */ 
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid request');
    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new NotFoundError('Not found keyStore');
    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN];
            const decodeUser = jwt.verify(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId');
            req.keyStore = keyStore;
            req.user = decodeUser; // {userId, username, role}
            req.refreshToken = refreshToken;
            return next();
        } catch (error) {
            throw error
        }
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError('Invalid request');
    try {
        const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId');
        req.keyStore = keyStore;
        req.user = decodeUser;
        return next();
    } catch (error) {
        throw error
    }
}) 

const checkRole = (...requiredRoles) => {
    return (req,res,next) => {
        const { role } = req.user;
        if (!role || !requiredRoles.includes(role)) {
            throw new ForbiddenError('You do not have the required role to access this resource');
        }
        next();
    }
}

module.exports = {
    createTokenPair,
    authentication,
    checkRole
}