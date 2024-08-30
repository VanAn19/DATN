const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();
const app = express();

// init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init db
require('./dbs/init.mongodb')
const initRedis = require('./dbs/init.redis');
initRedis.initRedis()

// init routes
app.use('', require('./routes'));

// handling error
app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status=404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status:'error',
        code:statusCode,
        stack: error.stack,
        message: error.message || 'Internal server error'
    })
})

module.exports = app; 