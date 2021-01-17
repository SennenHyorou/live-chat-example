var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function (){
    console.log('listening to request on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection',function(socket){
   console.log('made socket connection',socket.id)

    socket.on('typing', function (data){
        socket.broadcast.emit('typing',data);
    });

   socket.on('cancel-typing',function (data){
       console.log('masuk tak kesini?');
       socket.broadcast.emit('cancel-typing',data);
   })

    socket.on('chat',function (data){
        io.sockets.emit('chat',data);
    });
});