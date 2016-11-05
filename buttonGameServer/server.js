var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var people = {};
var active = false;

function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return key;
}

function updateList(){
  io.emit('update', people);
  console.log("Updated!");

}

io.on('connection', function(socket){

  socket.on('join', function(msg){
    people[socket.id] = {'name':msg, 'delay':"10000",'time': "" };
		console.log(people[socket.id].name + " has joined the server.");
    updateList();
	});

  socket.on('update', function(msg){
    updateList();
	});

  socket.on('start', function(msg){
    if(msg==1){
      if(active!=true){
        console.log("Awaiting Connections");
        active = true;
        runGame();
      }
    }
    else if(msg==2){
      if(active!=false){
       active = false;
       console.log("Connections Closed");
     }
    }
  });

  socket.on('push', function(msg){
    var current = new Date();
    var old = new Date(Math.floor(msg*1000));
    let h1   = current.getHours()-old.getHours();
    let m1 = current.getMinutes()-old.getMinutes();
    let s1 = current.getSeconds()-old.getSeconds();
    let ms1 = Math.abs(current.getMilliseconds()-old.getMilliseconds());
    var difference = Math.abs(current.getMilliseconds()-old.getMilliseconds());
    console.log(people[socket.id].name + " pressed with "+ difference + "ms delay.");
    if(people[socket.id].delay>difference){
      people[socket.id].delay = difference;
      people[socket.id].time = old.toLocaleString();
    }
    console.log(people);
    updateList();
  });

  socket.on('disconnect', function(msg){
    console.log(people[socket.id].name + " has left the server.");
    delete people[socket.id];
    updateList();
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
