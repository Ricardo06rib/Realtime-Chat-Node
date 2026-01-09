import express from 'express';
const app = express();
import http from 'http';
import path from 'path';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);

import { router } from './server/routes/routes.js'

import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '/client/public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

app.use('/', router);

io.on('connection', (socket) => {
    
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
    })

    socket.on('sendMessage', (username, msg, roomName) => {
        io.to(roomName).emit('chatMessage', username, msg);
    })

    socket.on('sendImage', (username, url, roomName) => {
        io.to(roomName).emit('chatImage', username, url);
    })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});