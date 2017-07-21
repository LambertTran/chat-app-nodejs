var socket = io();

//connect to socketIO
socket.on('connect',function() {
   console.log('connected to server');
});

socket.on('disconnect',function(){
   console.log('disconnected to server');
});

socket.on('newMessage',function(message){
   console.log('newMessage',message);

   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',function(e){
   e.preventDefault();

   socket.emit('createMessage',{
      from:'user test A',
      text:jQuery('[name = message]').val()
   },function(){

   });
});
