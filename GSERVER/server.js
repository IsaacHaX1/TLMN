const { log } = require("console");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
        origin: 'http://localhost:7456',
        origin: 'http://localhost'

  }
});

httpServer.listen(3000);

var roomsGame = [];

var romfunction = {
    checkRooms() {
        if (roomsGame.length > 0) {
    for (let i = 0; i < roomsGame.length; i++) {
        if (roomsGame[i].id.length == 1) {
            // join room co sans
            return [true, roomsGame[i],i];
        } 
            return [false];
    }
} else return [false];
}
}

function myFunction(p1, p2) {
    return p1 * p2;
}
io.on('connection', function (socket) {
    console.log("CO Nnguoi ket noi " + socket.id);

    socket.on("tao-room", function (data) {
        let checkroom = romfunction.checkRooms();
        if (checkroom[0]) {

            socket.join(checkroom[1].phong);
            socket.phong = checkroom[1].phong;
            roomsGame[checkroom[2]].id.push(checkroom[1].id[0]);
            console.log(roomsGame);

            socket.emit("tao-room-return", obj);

        } else {
            let ran = Math.floor(Math.random() * 10) + "" + (Math.random() + 1).toString(36).substring(7);

            socket.join(ran);
            socket.phong = ran;

            var obj = new Object();
            obj.phong = socket.phong;
            obj.id = [];
            obj.id.push(socket.id);
            roomsGame.push(obj);
            socket.emit("tao-room-return", roomsGame[roomsGame.length -1]);
        }

    })
    socket.on("disconnect", function () {
        console.log("Ngat ket noi " + socket.id);
    })

    socket.on("danh-co", function (data) {
        io.sockets.in(socket.phong).emit("danh-co-return",data)
    })

    socket.on("Client-send-data", function (data) {
        console.log(socket.id + " gui len sv:  " + data);
        io.sockets.emit("server-send-data", data + "888")
    })
})