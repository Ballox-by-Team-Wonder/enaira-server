const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const userRouter = require('./routes/user.route')

require('dotenv').config()

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())
app.use(cors())

/**
 * API routes
 */
app.use('/api/user', userRouter)

module.exports = app