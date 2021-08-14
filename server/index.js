const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    cors: "*"
})

io.on('connect', (socket) => {
    console.log("User is connected")
    socket.on('disconnect', (socket2) => {
        io.emit('userdisconnect', {
            id: socket.id,
            username: socket.username
        })
        console.log('User is disconnected')
    })

    socket.on('sendmessage', (data) => {
        socket.to(data.to).emit('sendmessage', {
            message: data.message, from: data.from, to: data.to
        })
    })

})
io.on('connection', (socket) => {

    const users = [];
    for(let [id, socket] of  io.of('/').sockets){
        users.push({
            id, username: socket.username
        });
    }
    socket.emit('users', users);
    socket.broadcast.emit('userconnect', {
        id: socket.id,
        username: socket.username
    })
})


io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if(!username){
        return next(new Error('Invalid username'))
    }
    socket.username = username;
    next();
})

httpServer.listen(3000, ()=>{
    console.log("Listen 3000 port")
})
