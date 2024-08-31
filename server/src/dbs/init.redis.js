'use strict'

const redis = require('redis');
const { RedisErrorResponse } = require('../core/error.response');

let client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error'
}, connectionTimeout

const REDIS_CONNECT_TIMEOUT = 10000, REDIS_CONNECT_MESSAGE = {
    code: -99,
    message: {
        vn: 'Redis lỗi',
        en: 'redis connection error'
    }
} 

const handleTimeoutError = () => {
    connectionTimeout = setTimeout(() => {
        throw new RedisErrorResponse({
            message: REDIS_CONNECT_MESSAGE.message.vn,
            statusCode: REDIS_CONNECT_MESSAGE.code
        });
    }, REDIS_CONNECT_TIMEOUT);
}

const handleEventConnection = ({ connectionRedis }) => {
    // check if connection is null
    connectionRedis.on(statusConnectRedis.CONNECT, () => {
        console.log(`Connection status: connected`);
        clearTimeout(connectionTimeout);
    });
    connectionRedis.on(statusConnectRedis.END, () => {
        console.log(`Connection status: disconnected`);
        // retry
        handleTimeoutError();
    });
    connectionRedis.on(statusConnectRedis.RECONNECT, () => {
        console.log(`Connection status: reconnecting`);
        clearTimeout(connectionTimeout);
    });
    connectionRedis.on(statusConnectRedis.ERROR, (err) => {
        console.log(`Connection status: error ${err}`);
        handleTimeoutError();
    });
}

const initRedis = () => {
    const instanceRedis = redis.createClient();
    client.instanceConnect = instanceRedis
    handleEventConnection({
        connectionRedis: instanceRedis
    });
}

const getRedis = () => client

const closeRedis = () => client.instanceConnect.disconnect();

module.exports = {
    initRedis,
    getRedis,
    closeRedis,
    client
}