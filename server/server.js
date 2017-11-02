const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3333;
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io')

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit('newMessage', {
		from: 'mike',
		text: 'see you there',
		createdAt: 123123
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage ', message);
	});

	socket.on('createEmail', (newEmail) => {
		console.log('createEmail ', newEmail);
	});

	socket.on('disconnect', () => {
		console.log('user was disconnected');
	});
});


server.listen(port, () => {
	console.log('server is up on 3333');
});
