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
            socket.emit("server-send-dki-thatbai"); /// send ve thang gui data
        }else{
            mangUser.push(data);
            socket.Username = data;
            socket.emit("server-send-dki-thanhcong", data);// send data cho may thang con lai tru thang gui data
            io.sockets.emit("server-send-danhsach_Users", mangUser); // send data tat ca

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

    socket.on("toi-dang-go-chu",function(){
        var s = socket.Username +"  dang go chu";
        io.sockets.emit("ai-do-dang-go-chu",s)
    })
    socket.on("toi-stop-go-chu",function(){
        
        io.sockets.emit("ai-do-stop-go-chu",s)
    })
})
app.get("/",function(reg,res){
    res.render("trangchu");
});

