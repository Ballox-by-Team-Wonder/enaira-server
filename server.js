const app = require('./app')
const http = require('http')
const mongoose = require('mongoose')
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5000
const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL

mongoose.connection.once('open', () => console.log('Mongo DB is connected!'))
mongoose.connection.on('error', (error) => console.log('Mongo DB error: ' + error))

mongoose.connect(MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const server = http.createServer(app)

const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
};
  

io.on('connection', (socket) => {
    console.log('client connected!')
    // getApiAndEmit(socket)

    socket.on('setup', ({ room }) => {
        socket.join(room)
    })

    socket.on('new_message', ({ room, messageData }) => {
        io.in(room).emit('message', messageData)
        console.log(room, messageData)
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})