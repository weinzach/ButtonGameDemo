var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var people = {};

function updateList(){
   let keysSorted = Object.keys(people);
   let bests = [];
   for (i = 0; i < keysSorted.length; i++) { 
	if(people[keysSorted[i]].best){
    		bests.push(people[keysSorted[i]].best);
	}
   }
  bests = bests.sort(function(a, b){return a-b});
  let sorted = [];
  for (i = 0; i < bests.length; i++) { 
	for (j = 0; j < keysSorted.length; j++) { 
		if(people[keysSorted[j]].best){
		if(people[keysSorted[j]].best==bests[i]){
			sorted.push(keysSorted[j]);
			keysSorted.splice(j, 1);
		}}
 	 }
   }
  let data = [sorted, people];
  io.emit('update', data);
  console.log("Updated!");
}

io.on('connection', function(socket){

  socket.on('join', function(msg){
    people[socket.id] = {'name':msg, 'delay': '', 'best': 10000,'time': "" };
		console.log(people[socket.id].name + " has joined the server.");
    updateList();
	});

  socket.on('update', function(msg){
    updateList();
	});

  socket.on('push', function(msg){
    if(people[socket.id]){
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
	}
  });

  socket.on('disconnect', function(msg){
    if(people[socket.id]){
      console.log(people[socket.id].name + " has left the server.");
      delete people[socket.id];
    }
    updateList();
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
