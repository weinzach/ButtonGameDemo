var socket = io();
  socket.on('connect', function () {
	});
  socket.on('disconnect', function () {
	});

  socket.on('play', function (data) {
    if(data==1){
      var audio = new Audio('./easy.mp3');
      audio.play();
    }
  });

function button(){
socket.emit('message','1');
}
