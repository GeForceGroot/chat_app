const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    connectionStateRecovery: {}
  });

app.use('/', express.static(__dirname + '/public'));


let users = {
    john: 'doe',
    shreyansh: 'hello',
    tiwari: 'ji',
    sir: 'oh'
}
io.on('connection', (socket) => {

    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                socket.join(data.username);
                socket.emit('logged_in', data);
            } else {
                socket.emit('login_error')
            }
        } else {
            users[data.username] == data.password
            socket.join(data.username);
            socket.emit('logged_in', data)
        }
    })

    socket.on('chat_message', (data) => {

        if (data.sendToUser) {
            io.to(data.sendToUser).emit('message-rcvd', data);
        } else {
            socket.broadcast.emit('message-rcvd', data);
        }
    })
});


server.listen(4040, () => {
    console.log('server is running on http://localhost:4040')
})