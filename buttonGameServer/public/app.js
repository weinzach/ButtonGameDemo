var socket = io();
  socket.on('connect', function () {
	});
  socket.on('disconnect', function () {
	});
  socket.on('update', function (data) {
    console.log(data);
  });
