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

   var messageTextBox = jQuery('[name=message]');

   socket.emit('createMessage',{
      from:'User',
      text:jQuery('[name = message]').val()
   },function(){
      messageTextBox.val('');
   });
});
