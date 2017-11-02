const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3333;
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit("newMessage", generateMessage(
		'Admin', 'welcom to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage(
		'Admin', 'new user joined'));

	socket.on('createMessage', (message) => {
		console.log('createMessage ', message);
		io.emit('newMessage', generateMessage(
			message.from, message.text));
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
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
