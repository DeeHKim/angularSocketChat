var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app).listen(3000);
var io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/node_modules', express.static(__dirname + "/../node_modules"));

// How would we be able to implement sockets with microservers (multiple servers?).

io.on('connection', function(socket){

  socket.on('chat', function(message){
    console.log(message);
      socket.broadcast.emit('message', message);
  });

  socket.emit('message', 'Welcome');

});

module.exports = io;


console.log('chat app now listening on localhost3000');

// module.exports = app;
