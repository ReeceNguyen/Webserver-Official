// Chương trình con đọc dữ liệu SQL
function fn_Alarm_Show(){
    socket.emit("msg_Alarm_Show", "true");
    socket.on('Alarm_Show',function(data){
        fn_table_Alarm(data);
    });
}
function fn_Alarm_Show_s2(){
    socket.emit("msg_Alarm_Show_s2", "true");
    socket.on('Alarm_Show_s2',function(data){
        fn_table_Alarm_s2(data);
    });
}
// Chương trình con hiển thị SQL ra bảng
function fn_table_Alarm(data){
    if(data){
        $("#table_Alarm tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){
                    txt += "<tr><td>"+data[i][`Date`]
                        +"</td><td>"+data[i][`ID`]
                        +"</td><td>"+data[i][`Status`]
                        +"</td><td>"+data[i][`Alarm Name`]
                        +"</td></tr>";
                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_Alarm").append(txt);
            }
        }
    }
}
function fn_table_Alarm_s2(data){
    if(data){
        $("#table_Alarm_s2 tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){
                    txt += "<tr><td>"+data[i][`Date`]
                        +"</td><td>"+data[i][`ID`]
                        +"</td><td>"+data[i][`Status`]
                        +"</td><td>"+data[i][`Alarm Name`]
                        +"</td></tr>";
                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_Alarm_s2").append(txt);
            }
        }
    }
}
// Tìm kiếm cảnh báo theo thời gian
function fn_Alarm_By_Time()
{
    var val = [document.getElementById('dtpk_AL_Search_Start').value,
               document.getElementById('dtpk_AL_Search_End').value];
    socket.emit('msg_Alarm_ByTime', val);
    socket.on('Alarm_ByTime', function(data){
        fn_table_Alarm(data); // Show alarm
    });
}
function fn_Alarm_By_Time_s2()
{
    var val = [document.getElementById('dtpk_AL_Search_Start_s2').value,
               document.getElementById('dtpk_AL_Search_End_s2').value];
    socket.emit('msg_Alarm_ByTime_s2', val);
    socket.on('Alarm_ByTime_s2', function(data){
        fn_table_Alarm_s2(data); // Show alarm
    });
}