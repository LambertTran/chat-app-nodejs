
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

   socket.on('disconnect',(socket) =>{
      console.log('user was disconnected');
   })
});

server.listen(port,() =>{
   console.log(`server is up on ${port}`);
})
