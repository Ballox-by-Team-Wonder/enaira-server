const socketIo = require("socket.io");

const NODE_ENV = process.env.NODE_ENV

function liveSocket(server) {

    const io = socketIo(server, {
        cors: {
            origin: NODE_ENV === 'production' 
                ? "https://samuel-travel-memories.netlify.app"
                : "http://localhost:3000",
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

    return io
}

module.exports = liveSocket