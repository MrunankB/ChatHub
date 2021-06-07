var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log('Server listening at port %d', port);
});

console.log('here');
app.use(express.static(path.join(__dirname, 'public')));

var numUsers = 0;

io.on('connection', function(socket) {
	var addedUser = false;

	socket.on('new message', function(data) {
 	socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

	socket.on('add user', function(username) {
		if (addedUser) return;

		socket.username = username;
		++numUsers;
		addedUser = true;
		socket.emit('login', {
			numUsers: numUsers
		});
