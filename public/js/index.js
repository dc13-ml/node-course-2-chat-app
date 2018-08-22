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

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (posn) {
        socket.emit('createLocationMessage', {
            latitude: posn.coords.latitude,
            longitude: posn.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location');
    });
});