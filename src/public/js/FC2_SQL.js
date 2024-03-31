// Chương trình con đọc dữ liệu SQL
function fn_SQL_Table_Show(){
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show',function(data){
        fn_table_data(data);
    });
}
function fn_SQL_Table_Show_s2(){
    socket.emit("msg_SQL_Show_s2", "true");
    socket.on('SQL_Show_s2',function(data){
        fn_table_data_s2(data);
    });
}
// Chương trình con hiển thị SQL ra bảng
function fn_table_data(data){
    if(data){
        $("#table_data tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){
                    txt += "<tr><td>"+data[i].Date
                        +"</td><td>"+data[i][`Order ID`]
                        +"</td><td>"+data[i][`Material 1 Setting`]
                        +"</td><td>"+data[i][`Material 2 Setting`]
                        +"</td><td>"+data[i][`Material 3 Setting`]
                        +"</td><td>"+data[i][`Mix Time Setting`]
                        +"</td><td>"+data[i][`Material 1 Actual`]
                        +"</td><td>"+data[i][`Material 2 Actual`]
                        +"</td><td>"+data[i][`Material 3 Actual`]
                        +"</td><td>"+data[i][`Mix Time Actual`]
                        +"</td></tr>";
                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_data").append(txt);
            }
        }
    }
}
function fn_table_data_s2(data){
    if(data){
        $("#table_data_s2 tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=0;i<len;i++){
                    txt += "<tr><td>"+data[i].Date
                        +"</td><td>"+data[i][`Order ID`]
                        +"</td><td>"+data[i][`Material 1 Setting`]
                        +"</td><td>"+data[i][`Material 2 Setting`]
                        +"</td><td>"+data[i][`Material 3 Setting`]
                        +"</td><td>"+data[i][`Mix Time Setting`]
                        +"</td><td>"+data[i][`Material 1 Actual`]
                        +"</td><td>"+data[i][`Material 2 Actual`]
                        +"</td><td>"+data[i][`Material 3 Actual`]
                        +"</td><td>"+data[i][`Mix Time Actual`]
                        +"</td></tr>";
                    }
            if(txt != ""){
            txt +="</tbody>";
            $("#table_data_s2").append(txt);
            }
        }
    }
}
// Tìm kiếm SQL theo khoảng thời gian
function fn_SQL_By_Time()
{
    var val = [document.getElementById('dtpk_Search_Start').value,
               document.getElementById('dtpk_Search_End').value];
    socket.emit('msg_SQL_ByTime', val);
    socket.emit('msg_SQL_Mass_ByTime',val);
    socket.on('SQL_ByTime', function(data){
        fn_table_data(data); // Show sdata
    });
}
function fn_SQL_By_Time_s2()
{
    var val = [document.getElementById('dtpk_Search_Start_s2').value,
               document.getElementById('dtpk_Search_End_s2').value];
    socket.emit('msg_SQL_ByTime_s2', val);
    socket.emit('msg_SQL_Mass_ByTime_s2',val);
    socket.on('SQL_ByTime_s2', function(data){
        fn_table_data_s2(data); // Show sdata
    });
}