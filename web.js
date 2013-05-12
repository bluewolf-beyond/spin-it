var port  = process.env.PORT || 8001;


var express = require('express')	
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
  socket.broadcast.emit('news', { hello: 'hello world' });
  socket.on('rotate', function (data) {
    socket.broadcast.emit('beginrotate', data );	
    console.log(data);
  });	

});



console.log("Listening on " + port);
