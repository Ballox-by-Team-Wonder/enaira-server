const app = require('./app')
const http = require('http')
const socketIo = require("socket.io");
const { mongoConnect } = require('./services/mongo.service');

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV


mongoConnect()

const server = http.createServer(app)

const io = socketIo(server, {
    cors: {
      origin: NODE_ENV === 'production' 
        ? "https://samuel-travel-memories.netlify.app"
        : "localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
});

// const getApiAndEmit = socket => {
//     const response = new Date();
//     socket.emit("FromAPI", response);
// };
  

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