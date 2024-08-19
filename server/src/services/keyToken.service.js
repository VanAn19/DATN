'use strict'

const { Types } = require("mongoose");
const KeyToken = require('../models/keyToken.model');

class KeyTokenService {

    static createKeyToken = async({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId }, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true };
            const tokens = await KeyToken.findOneAndUpdate(filter, update, options);
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            console.error(error);
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await KeyToken.findOne({ user: new Types.ObjectId(userId) });
    }

    static removeKeyById = async (id) => {
        return await KeyToken.deleteOne({ _id: id});
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await KeyToken.findOne({ refreshTokensUsed: refreshToken }).lean();
    }

    static findByRefreshToken = async (refreshToken) => {
        return await KeyToken.findOne({ refreshToken });
    }

    static deleteKeyById = async (userId) => {
        return await KeyToken.findByIdAndDelete({ user: userId });
    }
}

module.exports = KeyTokenService