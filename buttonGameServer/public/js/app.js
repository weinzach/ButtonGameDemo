var socket = io();
  socket.on('update', function (data) {
    let table = '<table class="striped"><thead>';
    table += "<tr>";
    table += "<th>Rank</th>";
    table += "<th>MAC Address</th>";
    table += "<th>Last Delay (ms)</th>";
    table += "<th>Best Delay (ms)</th>";
    table += "<th>Time of Best Delay</th>";
    table += "</tr></thead><tbody>";
    for (var i in data[0]) {
      table += "<tr>";
      let j = i+1;
      table += "<td>"+j+"</td>";
      table += "<td>"+data[1][data[0][i]].name+"</td>";
      table += "<td>"+data[1][data[0][i]].delay+"</td>";
      table += "<td>"+data[1][data[0][i]].best+"</td>";
      table += "<td>"+data[1][data[0][i]].time+"</td>";
      table += "</tr>";
    }
    table += "</tbody></table>"
    document.getElementById("tabledata").innerHTML = table;
  });
