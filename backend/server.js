const express = require('express');
const { join } = require('node:path');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3000;

const user = require('./user');

app.use(express.static(path.join(__dirname,'..' , 'frontend' ,'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend' , 'intro.html'));
});

app.get('/chat/:userName', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend' , 'user.html'));
});

let username = '';
io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        socket.broadcast.emit('chat receive', msg)
    });
    
    
    socket.on('name', (name) => {
        username = name;
    })
    socket.emit('get', username);
});

server.listen(port);

