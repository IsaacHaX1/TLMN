var socket = io("http://localhost:3000");
socket.on("server-send-dki-thatbai",function(){
    alert("sai username co nguoi dang ky roi ... ")
});
socket.on("server-send-dki-thanhcong",function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
    

});
socket.on("server-send-danhsach_Users",function(data){
    console.log(data);
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>"+i+"</div>");
    });
});

socket.on("server-send-mesage", function(data){
    $("#listMessages").append("<div class='ms'>"+data.un+ ":"+data.nd+"</div>");

})
$(document).ready(function(){
   // alert(1);
   $("#loginForm").show();
   $("#chatForm").hide();
   $("#btnRegister").click(function(){
    alert($("#txtUsername").val());
    socket.emit("client-send-Username",$("#txtUsername").val());
   })

   $("#btnLogout").click(function(){
    socket.emit("logout");
    $("#chatForm").hide(2000);
    $("#loginForm").show(1000);
   })

   $("#btnSendMessage").click(function(){
    console.log($("#txtMessage").val());
    socket.emit("user-send-message", $("#txtMessage").val());
   })

})