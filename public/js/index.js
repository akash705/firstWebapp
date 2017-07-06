var socket= io();

socket.on('connect',function ()
{
  console.log("I am connected");
});
socket.on("disconnect",function ()
{
    console.log("no connection trying to reconnect");
});

socket.on("newmessage",function (data)
{
  console.log("New Message",data);

  //creating new list item

  var li=jQuery("<li class='list-group-item'></li>");
  li.text(`${data.from} : ${data.text}`);

  jQuery('#messages').append(li);

});
// to send acknowledgement we must have a third argument call back function
// socket.emit('createMessage',{
//   "from":"Akash",
//   "text":"hi"
// }, function (data){
//   if(data.recieved === "successfully")
//   {
//     console.log("successfully transfer data");
//   }
//   else
//   {
//     console.log("it is not done yet");
//   }
// });
// removing default behavior of submit form and e is the event of that
jQuery('#form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:"User",
    text : jQuery('[name=message]').val()
  },function (callback){
      console.log("message recieved successfully");
      document.getElementById('mess').value=" ";
  });

});
