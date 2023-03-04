//observer for listening connections

module.exports.chatSockets  = function(socketServer){

    let io = require('socket.io')(socketServer, {

        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
          }
    });

    //io.connect from client side fire connection here and connection is established
    io.sockets.on('connection', function(socket){

        console.log('new connection is recieved', socket.id);
        //sending ack to the connection received thus emitting

        socket.on('disconnect', function(){

            console.log("socket disconnected");
        });

        socket.on('join_room', function(data){

            console.log("joining request received", data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data.user_email);
        })

        socket.on('send_message', function(data){

            io.in(data.chatroom).emit('receive_message', data);
        });

    });

     



}