const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

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

    // Trigger email event
    socket.emit('newEmail', {
        from: 'dennis@sample.com',
        body: 'this is a testing',
        createAt: 123
    });

    // Listen to create email event
    socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    });

    // Trigger message event
    // socket.emit('newMessage', {
    //     from: 'shao@sample.com',
    //     text: 'this is a message from server',
    //     createAt: 456
    // });

    // Listen to create message event
    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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