const { log } = require('console');
const express = require('express')
const app = express()
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection",function(socket){
    console.log("Co nguoi ket noi "+socket.id)
})
app.get("/",function(reg,res){
    res.render("trangchu");
});

