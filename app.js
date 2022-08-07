const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
require('dotenv').config()
const userRouter = require('./routes/user.route')
const memoryRouter = require('./routes/memory.route')
const messageRouter = require('./routes/message.route')
const stripeRouter = require('./routes/stripe.route')


const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())


/**
 * API routes
 */
app.use('/api/user', userRouter)


module.exports = app