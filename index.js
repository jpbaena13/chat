var app = require('express')()
	,https = require('http').Server(app)
	,io = require('socket.io')(https);

app.get('/', function(req, res) {
	res.send('Lantia Realtime :)');
});

var port = process.env.port || 8080;

https.listen(port);