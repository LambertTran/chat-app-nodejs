
// make path look pretty
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/valadation');


const publicPath = path.join(__dirname,'../public');

//setup server
const express=require('express');
var app = express();
var server = http.createServer(app); // connect app to server
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) =>{
   console.log('new connection');


   socket.on('join',(params,callback) => {
      if ( !isRealString(params.Name) || !isRealString(params.Room)) {
         callback('Name or room is not valid');
      };
      
      socket.join(params.Room); // join user to target room

      socket.emit('newMessage', generateMessage('Admin','welcome to chat room'));

      socket.broadcast.to(params.Room).emit('newMessage',generateMessage('Admin',`${params.Name} has joined`)); 

      //calback();
   });

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
