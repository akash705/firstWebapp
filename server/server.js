var express=require('express');
var socketio=require('socket.io');
const path = require('path');
var http=require('http');

const {generatemessage}=require('./utils/message')


var app=express();
const port=process.env.PORT || 3000 ;
const publicpath=path.join(__dirname,'../public');

app.use(express.static(publicpath));
var server=http.createServer(app);

var io=socketio(server);

io.on("connect",(socket)=>
{
    console.log("new user connected");
    //to connected user
    socket.emit("newmessage",generatemessage('Admin','Welome to the chat group'));
    //to other than connected user
    socket.broadcast.emit('newmessage',generatemessage('Admin','New user joined'));
     // for acknowledgement must add a argument second argument is call back function
    socket.on("createMessage",(message,callback)=>
    {
        console.log("message recieved",JSON.stringify(message));
        // calling method for acknowledgement
        callback({
          recieved:""
        });
        // io.emit('newmessage',{
        //   "from" : message.from,
        //   "message":message.message,
        //   "createdat" :message.createdat
        // });
        io.emit('newmessage',generatemessage(message.from,message.text));


});

    socket.on('disconnect',()=>{
        console.log("user was disconnect");
    });
});

app.get('/',(req,res)=>
{
  res.send("hell");
})

server.listen(port,()=>{
  console.log(`Server is live go to localhost:${port}`);

})
