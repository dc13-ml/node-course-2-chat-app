// Create a socket connection
var socket = io();

// Listen to 'connect' event
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'cheng@sample.com',
        text: 'from client to server'
    });

    // socket.emit('createMessage', {
    //     from: 'mimi@sample.com',
    //     text: 'from client to server on message created'
    // });
});

// Listen to 'disconnect' event
socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newEmail', function (email) {
    console.log('New email arrived from server', email);
});

socket.on('newMessage', function (message) {
    console.log('New message arrived from server', message);
});