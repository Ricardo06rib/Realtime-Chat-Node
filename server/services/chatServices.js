io.on('connection', (socket) => {
    
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
    })

    socket.on('chatMessage', (username, msg, roomName) => {
        socket.to(roomName).emit('chatMessage', username, msg);
    })
})