var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('message', function(msg,socket){
    if(msg=='1'){
    io.emit('play', '1');
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
