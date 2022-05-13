const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const userRouter = require('./routes/user.route')
const memoryRouter = require('./routes/memory.route')
const commentRouter = require('./routes/comment.route')

require('dotenv').config()

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())
app.use(cors())

app.use('/images/', express.static('./images'));

// app.use(express.static(path.join(__dirname, '..', 'public')))


/**
 * API routes
 */
app.use('/api/user', userRouter)
app.use('/api/memory', memoryRouter)
app.use('/api/comment', commentRouter)

module.exports = app