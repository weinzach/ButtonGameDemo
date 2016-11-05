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
  let keysSorted = Object.keys(people).sort(function(a,b){return list[a.best]-list[b.best]})
  io.emit('update', people, keysSorted);
  console.log("Updated!");
}

io.on('connection', function(socket){

  socket.on('join', function(msg){
    people[socket.id] = {'name':msg, 'delay': '', 'best':"10000",'time': "" };
		console.log(people[socket.id].name + " has joined the server.");
    updateList();
	});

  socket.on('update', function(msg){
    updateList();
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
    people[socket.id].delay = difference;
    if((people[socket.id].best>difference)&&(difference>0)){
      people[socket.id].best = difference;
      people[socket.id].time = old.toLocaleString();
    }
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
