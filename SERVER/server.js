const { log } = require('console');
const express = require('express')
const app = express()
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
var mangUser = [];

io.on("connection",function(socket){
    console.log("Co nguoi ket noi "+socket.id);
    socket.on("client-send-Username",function(data){
        console.log(data);
        if(mangUser.indexOf(data)>=0){ // xem xo dât trong mang khong
            socket.emit("server-send-dki-thatbai");
        }else{
            mangUser.push(data);
            socket.Username = data;
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danhsach_Users", mangUser);

        }
    });

    socket.on("logout",function(){
        mangUser.splice(
            mangUser.indexOf(socket.Username),1
        );
        socket.broadcast.emit("server-send-danhsach_Users", mangUser);
    })

    socket.on("user-send-message",function(data){
        // phat data xuong tat ca moi nguoi
        io.sockets.emit("server-send-mesage",{un:socket.Username, nd:data});
    })
})
app.get("/",function(reg,res){
    res.render("trangchu");
});

