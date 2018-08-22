// Create a socket connection
var socket = io();

// Listen to 'connect' event
socket.on('connect', function () {
    console.log('Connected to server');
});

// Listen to 'disconnect' event
socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
    console.log('New message arrived from server', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newMessage', function (message) {
    console.log('welcome message', message);
});

socket.on('newMessage', function (message) {
    console.log('newUser message', message);
});

// socket.emit('createMessage', {
//     from: 'mimi@sample.com',
//     text: 'Emit from client to server on createMessage'
// }, function(message) {
//     console.log('Received ack from server ', message);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});