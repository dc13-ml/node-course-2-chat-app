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

io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.on('disconnect', ()=>{
        console.log('Disconnect user client');
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}...`);
});

module.exports = {
    app
};