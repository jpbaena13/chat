var express = require('express');
var app = express();
var path = require('path');
var port = 80;

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

var io = require('socket.io').listen(app.listen(port));

var socketIDs = [];

io.sockets.on('connection', function(socket) {
	socketIDs.push(socket.id);

	io.sockets.emit('connected', { sockets: socketIDs });

	socket.on('send', function(data) {
		io.sockets.emit('message', data);
	});

	socket.on('disconnect', function(data) {
		socketIDs.splice( socketIDs.indexOf(socket.id) ); 
		io.sockets.emit('disconnected', {id: socket.id} );
	})
});