const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// https://guarded-wildwood-13904.herokuapp.com/

var app = express();

// create a http server
var server = http.createServer(app);

// create a web socket server
var io = socketIO(server);

app.use(express.static(publicPath));

// Listen to new connection event
io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        };
        socket.join(params.room);

        // socket.emit targets to a specific user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

        // socket.broadcast.emit targets to everyone in a room except the current user 
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined room ${params.room}`));
    
        callback();
    });

    // Listen to createMessage event
    socket.on('createMessage', (message,callback)=>{
        console.log('createMessage', message);
        // broadcast a newMessage when a createMessage arrive.
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coord) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coord.latitude, coord.longitude));
    });

    // Listen to socket disconnect event
    socket.on('disconnect', ()=>{
        console.log('Disconnect user client');
    });
});

// set http server to listen to port 
server.listen(port, ()=>{
    console.log(`Server is up on port ${port}...`);
});

module.exports = {
    app
};