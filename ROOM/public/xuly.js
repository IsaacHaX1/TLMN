var socket = io("http://localhost:3000");
socket.on("server-send-dki-thatbai",function(){
    
});
socket.on("server-send-dki-thanhcong",function(data){

    

});

$(document).ready(function(){
   // alert(1);
   $("#btnTaoRoom").click(function(){
      console.log("ccssss")
      socket.emit("tao-room", $("#txtRoom").val())
;   })

})