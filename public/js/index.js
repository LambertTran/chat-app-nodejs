var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
 messages.animate({scrollTop:scrollHeight}, 1000);
 return false;
}
}



//connect to socketIO
socket.on('connect',function() {
   console.log('connected to server');
});

//disconnect socketIO
socket.on('disconnect',function(){
   console.log('disconnected to server');
});

// show the message
socket.on('newMessage',function(message){
   var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
      text:message.text,
      from:message.from,
      createdAt:formattedTime
   });

   jQuery('#messages').append(html);

   scrollToBottom ();
   //
   // console.log('newMessage',message);
   //
   // var li = jQuery('<li></li>');
   // li.text(`${message.from} ${formattedTime}: ${message.text}`);
   // jQuery('#messages').append(li);
})

// target form input and extract message
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
