
// make path look pretty
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'../public');

//setup server
const express=require('express');
var app = express();
var server = http.createServer(app); // connect app to server
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) =>{
   console.log('new connection');

   //send back data to client/single connection
   socket.emit('newMessage', {
      from:'admin',
      text:'wellcome to chatRoom',
      createdAt: new Date().getTime()
   });

   socket.broadcast.emit('newMessage',{
      from:'admin',
      text:'new user join',
      createdAt: new Date().getTime()
   });

   socket.on('createMessage', (message) => {
      console.log('createMessage',message);

      // io.emit('newMessage',{
      //    from:message.from,
      //    text:message.text,
      //    createdAt: new Date().getTime()
      // });

   });




   socket.on('disconnect',(socket) =>{
      console.log('user was disconnected');
   });


});

server.listen(port,() =>{
   console.log(`server is up on ${port}`);
})
