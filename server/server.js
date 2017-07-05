var express=require('express');
var socket=require('socket.io');
const path = require('path');


var app=express();
const port=process.env.PORT || 3000 ;
const publicpath=path.join(__dirname,'../public');

app.use(express.static(publicpath));

app.listen(port,()=>{
  console.log(`Server is live go to localhost:${port}`);

})
