var socket = io();
  socket.on('update', function (data) {
    let table = "<table>";
    table += "<tr>";
    table += "<th>Rank</th>";
    table += "<th>MAC Address</th>";
    table += "<th>Last Delay (ms)</th>";
    table += "<th>Best Delay (ms)</th>";
    table += "<th>Time of Best Delay</th>";
    table += "</tr>";
    for (var i in data[0]) {
      table += "<tr>";
      let j = i+1;
      table += "<th>"+j+"</th>";
      table += "<th>"+data[1][data[0][i]].name+"</th>";
      table += "<th>"+data[1][data[0][i]].delay+"</th>";
      table += "<th>"+data[1][data[0][i]].best+"</th>";
      table += "<th>"+data[1][data[0][i]].time+"</th>";
      table += "</tr>";

    }
    table += "</table>"
    document.getElementById("table").innerHTML = table;
  });
