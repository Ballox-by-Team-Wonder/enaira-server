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

app.use('/images/', express.static('./images'));

// app.use(express.static(path.join(__dirname, '..', 'public')))


/**
 * API routes
 */
app.use('/api/user', userRouter)
app.use('/api/memory', memoryRouter)
app.use('/api/message', messageRouter)
app.use('/api/stripe', stripeRouter)

module.exports = app