var socket = io();

socket.on('connect', function(){
	console.log('connected to server')

	socket.emit('createMessage', {
		from: 'andrew',
		text: 'how are  you'
	})
});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage){
	console.log('new newMessage', newMessage);
});