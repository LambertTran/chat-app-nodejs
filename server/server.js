
// make path look pretty
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

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
   socket.emit('newMessage', generateMessage('Admin','welcome to chat room'));

   socket.broadcast.emit('newMessage',generateMessage('Admin','new user join'));

   socket.on('createMessage', (message,callback) => {
      console.log('createMessage',message);
      io.emit('newMessage',generateMessage(message.from,message.text));

      callback(); //aknowledge
   });

   socket.on('disconnect',(socket) =>{
      console.log('user was disconnected');
   });


});

server.listen(port,() =>{
   console.log(`server is up on ${port}`);
})
