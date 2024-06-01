function fn_User_Show(){
    socket.emit("msg_user_Show", "true");
    socket.on("user_Show",function(data){
        fn_table_user(data);
    });
}
function fn_table_user(data){
    if(data){
        $("#table_user tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){
                    txt += "<tr><td>"+data[i][`Name`]
                        +"</td><td>"+data[i][`LoginTime`]
                        +"</td><td>"+data[i][`LogoutTime`]
                        +"</td></tr>";
                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_user").append(txt);
            }
        }
    }
}