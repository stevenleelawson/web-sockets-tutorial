var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(konnect){
//     console.log('user disconnected');
//     // io.sockets.emit('disconnect', konnect);
//   });
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.sockets.emit('chat message', msg);
    // socket.broadcast.emit('chat message', `${msg.user}: ${msg.value}`)
  });
  socket.on('user name', (user) => {
    io.sockets.emit('user name', user)
  })
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//
//     socket.broadcast.emit('chat message', ` ${msg.user}: ${msg.vaule}`);
//   })


io.emit('chat message', 'user disconnect');


// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});
