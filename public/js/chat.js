var socket = io();

function scrollToButtom() {
	var message = jQuery('#message');
	var newMessage = message.children('li:last-child')
	var clientHeight = message.prop('clientHeight');
	var scrollTop = message.prop('scrollTop');
	var scrollHeight = message.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();


	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		message.scrollTop(scrollHeight);
	}
}

socket.on('connect', function(){
	var params = jQuery.deparam(window.location.search);
	socket.emit('join', params, function (err) {
		if(err){
			alert(err);
			window.location.href = "/";
		} else{
			console.log('no error');
		}
	});

});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});

socket.on('updateUserList', function(users){
	var ol = jQuery('<ol></ol>');

	users.forEach(function(user){
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
});

socket.on('newMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = jQuery("<li></li>");
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);
	// jQuery('#message').append(li);
	var template = jQuery("#message-template").html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#message').append(html);
	scrollToButtom();
});

socket.on('newLocationMessage', function(message){
	
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery("#location-message-template").html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery('#message').append(html);
	scrollToButtom();
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current location </a>');
	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	// jQuery('#message').append(li);
});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();
	var messageTextBox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function(){
		messageTextBox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
	if(!navigator.geolocation) {
		return alert('geolocation not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('sending location...');
	navigator.geolocation.getCurrentPosition(
		function(position){
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function(){
			locationButton.removeAttr('disabled').text('Send location');
			alert('Unable to fetch location')
		});
});