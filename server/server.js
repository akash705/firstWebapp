var express=require('express');
var socketio=require('socket.io');
const path = require('path');
var http=require('http');


var app=express();
const port=process.env.PORT || 3000 ;
const publicpath=path.join(__dirname,'../public');

app.use(express.static(publicpath));
var server=http.createServer(app);

var io=socketio(server);

io.on("connect",(socket)=>
{
    console.log("new user connected");
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
