const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000
const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL

mongoose.connection.once('open', () => console.log('Mongo DB is connected!'))
mongoose.connection.on('error', (error) => console.log('Mongo DB error: ' + error))

mongoose.connect(MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})