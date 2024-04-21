// /////////////////////////KẾT NỐI WEBSERVER VỚI PLC/////////////////////////
// KHỞI TẠO KẾT NỐI PLC
require("dotenv").config();
// triger ghi dữ liệu vào SQL
var insert_trigger = false;
var old_insert_trigger = false;
var insert_trigger_s2 = false;
var old_insert_trigger_s2 = false;
// triger delete dữ liệu SQL
var delete_trigger = false;
var old_delete_trigger = false;
var delete_trigger_s2 = false;
var old_delete_trigger_s2 = false;
//trigger ghi dữ liệu cảnh báo vào SQL
var Alarm_ID1 = false;
var Alarm_ID2 = false;
var Alarm_ID3 = false;
var Alarm_ID4 = false;
var Alarm_ID5 = false;

var Alarm_ID1_old = false;
var Alarm_ID2_old = false;
var Alarm_ID3_old = false;
var Alarm_ID4_old = false;
var Alarm_ID5_old = false;

var Alarm_ID1_s2 = false;
var Alarm_ID2_s2 = false;
var Alarm_ID3_s2 = false;
var Alarm_ID4_s2 = false;
var Alarm_ID5_s2 = false;

var Alarm_ID1_old_s2 = false;
var Alarm_ID2_old_s2 = false;
var Alarm_ID3_old_s2 = false;
var Alarm_ID4_old_s2 = false;
var Alarm_ID5_old_s2 = false;
// Khởi tạo SQL
var { sqlcon, sqlcon_s2 } = require("./config/connectDB");
// Mảng xuất dữ liệu Excel
var SQL_Excel = [];
var AL_Excel = [];
var Mass_Excel = [];
var SQL_Excel_s2 = [];
var AL_Excel_s2 = [];
var Mass_Excel_s2 = [];
const { conn_plc, conn_plc_s2 } = require("./config/plcConnection");
// Đọc dữ liệu từ PLC và đưa vào array tags
var arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
var arr_tag_value_s2 = [];
function valuesReady(anythingBad, values) {
  if (anythingBad) {
    console.log("Read Tags Error - STATION 1");
  } // Cảnh báo lỗi
  var lodash = require("lodash"); // Chuyển variable sang array
  arr_tag_value = lodash.map(values, (item) => item);
  console.log(values); // Hiển thị giá trị để kiểm tra
}

function valuesReady_s2(anythingBad, values) {
  if (anythingBad) {
    console.log("Read Tags Error - STATION 2");
  } // Cảnh báo lỗi
  var lodash = require("lodash"); // Chuyển variable sang array
  arr_tag_value_s2 = lodash.map(values, (item) => item);
  console.log(values); // Hiển thị giá trị để kiểm tra
}
// Hàm chức năng scan giá trị
function fn_read_data_scan() {
  //Station 1
  conn_plc.readAllItems(valuesReady);
  conn_plc_s2.readAllItems(valuesReady_s2);
  fn_sql_insert();
  fn_sql_delete();
  fn_Alarm_Manage();
  fn_sql_insert_mass();
  //Station 2
  fn_sql_insert_s2();
  fn_sql_delete_s2();
  fn_Alarm_Manage_s2();
  fn_sql_insert_mass_s2();
}
// Time cập nhật
setInterval(() => fn_read_data_scan(), 500);
// /////////////////////////++THIẾT LẬP KẾT NỐI WEB (WEB BORROW)++/////////////////////////
var express = require("express");
var app = express();
const initWebRoutes = require("./routes/web");
const configViewEngine = require("./config/viewEngine");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

//use cookie parser
app.use(cookieParser("secret"));
//config session
app.use(
  session({
    secret: "123456cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
// Enable body parser post data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config template
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT);

//Initial all web routes
initWebRoutes(app);

// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag() {
  //Station 1
  io.sockets.emit("btt_Auto", arr_tag_value[0]);
  io.sockets.emit("btt_Manu", arr_tag_value[1]);
  io.sockets.emit("btt_Auto_Confirm", arr_tag_value[2]);
  io.sockets.emit("btt_V1_Open", arr_tag_value[3]);
  io.sockets.emit("btt_V1_Close", arr_tag_value[4]);
  io.sockets.emit("btt_V2_Open", arr_tag_value[5]);
  io.sockets.emit("btt_V2_Close", arr_tag_value[6]);
  io.sockets.emit("btt_V3_Open", arr_tag_value[7]);
  io.sockets.emit("btt_V3_Close", arr_tag_value[8]);
  io.sockets.emit("btt_DC_Tron_Run", arr_tag_value[9]);
  io.sockets.emit("btt_DC_Tron_Stop", arr_tag_value[10]);
  io.sockets.emit("btt_DC_Export_Run", arr_tag_value[11]);
  io.sockets.emit("btt_DC_Export_Stop", arr_tag_value[12]);
  io.sockets.emit("CB_Can", arr_tag_value[13]);
  io.sockets.emit("Q_Lamp_Auto", arr_tag_value[14]);
  io.sockets.emit("Q_Lamp_Manu", arr_tag_value[15]);
  io.sockets.emit("status_Valve_1", arr_tag_value[16]);
  io.sockets.emit("status_Valve_2", arr_tag_value[17]);
  io.sockets.emit("status_Valve_3", arr_tag_value[18]);
  io.sockets.emit("status_DC_Tron", arr_tag_value[19]);
  io.sockets.emit("status_DC_Export", arr_tag_value[20]);
  io.sockets.emit("Setting_Time_Tron", arr_tag_value[21]);
  io.sockets.emit("Act_Time_Tron", arr_tag_value[22]);
  io.sockets.emit("Setting_Weight_1", arr_tag_value[23]);
  io.sockets.emit("Setting_Weight_2", arr_tag_value[24]);
  io.sockets.emit("Setting_Weight_3", arr_tag_value[25]);
  io.sockets.emit("Act_Weight_1", arr_tag_value[26]);
  io.sockets.emit("Act_Weight_2", arr_tag_value[27]);
  io.sockets.emit("Act_Weight_3", arr_tag_value[28]);
  io.sockets.emit("sql_insert_Trigger", arr_tag_value[29]);
  io.sockets.emit("sql_insert_On", arr_tag_value[30]);
  io.sockets.emit("sql_insert_Off", arr_tag_value[31]);
  io.sockets.emit("sql_insert_Temp", arr_tag_value[32]);
  io.sockets.emit("sql_delete_Trigger", arr_tag_value[33]);
  io.sockets.emit("sql_OrderID", arr_tag_value[34]);
  io.sockets.emit("sql_Weight1_Setting", arr_tag_value[35]);
  io.sockets.emit("sql_Weight2_Setting", arr_tag_value[36]);
  io.sockets.emit("sql_Weight3_Setting", arr_tag_value[37]);
  io.sockets.emit("sql_Weight1_Actual", arr_tag_value[38]);
  io.sockets.emit("sql_Weight2_Actual", arr_tag_value[39]);
  io.sockets.emit("sql_Weight3_Actual", arr_tag_value[40]);
  io.sockets.emit("sql_Time_Tron_Setting", arr_tag_value[41]);
  io.sockets.emit("sql_Time_Tron_Actual", arr_tag_value[42]);
  io.sockets.emit("on_System", arr_tag_value[43]);
  io.sockets.emit("off_System", arr_tag_value[44]);
  io.sockets.emit("Alarm_M1", arr_tag_value[45]);
  io.sockets.emit("Alarm_M2", arr_tag_value[46]);
  io.sockets.emit("Alarm_M3", arr_tag_value[47]);
  io.sockets.emit("Alarm_Mix", arr_tag_value[48]);
  io.sockets.emit("Alarm_Export", arr_tag_value[49]);

  //Station 2
  io.sockets.emit("btt_Auto_s2", arr_tag_value_s2[0]);
  io.sockets.emit("btt_Manu_s2", arr_tag_value_s2[1]);
  io.sockets.emit("btt_Auto_Confirm_s2", arr_tag_value_s2[2]);
  io.sockets.emit("btt_V1_Open_s2", arr_tag_value_s2[3]);
  io.sockets.emit("btt_V1_Close_s2", arr_tag_value_s2[4]);
  io.sockets.emit("btt_V2_Open_s2", arr_tag_value_s2[5]);
  io.sockets.emit("btt_V2_Close_s2", arr_tag_value_s2[6]);
  io.sockets.emit("btt_V3_Open_s2", arr_tag_value_s2[7]);
  io.sockets.emit("btt_V3_Close_s2", arr_tag_value_s2[8]);
  io.sockets.emit("btt_DC_Tron_Run_s2", arr_tag_value_s2[9]);
  io.sockets.emit("btt_DC_Tron_Stop_s2", arr_tag_value_s2[10]);
  io.sockets.emit("btt_DC_Export_Run_s2", arr_tag_value_s2[11]);
  io.sockets.emit("btt_DC_Export_Stop_s2", arr_tag_value_s2[12]);
  io.sockets.emit("CB_Can_s2", arr_tag_value_s2[13]);
  io.sockets.emit("Q_Lamp_Auto_s2", arr_tag_value_s2[14]);
  io.sockets.emit("Q_Lamp_Manu_s2", arr_tag_value_s2[15]);
  io.sockets.emit("status_Valve_1_s2", arr_tag_value_s2[16]);
  io.sockets.emit("status_Valve_2_s2", arr_tag_value_s2[17]);
  io.sockets.emit("status_Valve_3_s2", arr_tag_value_s2[18]);
  io.sockets.emit("status_DC_Tron_s2", arr_tag_value_s2[19]);
  io.sockets.emit("status_DC_Export_s2", arr_tag_value_s2[20]);
  io.sockets.emit("Setting_Time_Tron_s2", arr_tag_value_s2[21]);
  io.sockets.emit("Act_Time_Tron_s2", arr_tag_value_s2[22]);
  io.sockets.emit("Setting_Weight_1_s2", arr_tag_value_s2[23]);
  io.sockets.emit("Setting_Weight_2_s2", arr_tag_value_s2[24]);
  io.sockets.emit("Setting_Weight_3_s2", arr_tag_value_s2[25]);
  io.sockets.emit("Act_Weight_1_s2", arr_tag_value_s2[26]);
  io.sockets.emit("Act_Weight_2_s2", arr_tag_value_s2[27]);
  io.sockets.emit("Act_Weight_3_s2", arr_tag_value_s2[28]);
  io.sockets.emit("sql_insert_Trigger_s2", arr_tag_value_s2[29]);
  io.sockets.emit("sql_insert_On_s2", arr_tag_value_s2[30]);
  io.sockets.emit("sql_insert_Off_s2", arr_tag_value_s2[31]);
  io.sockets.emit("sql_insert_Temp_s2", arr_tag_value_s2[32]);
  io.sockets.emit("sql_delete_Trigger_s2", arr_tag_value_s2[33]);
  io.sockets.emit("sql_OrderID_s2", arr_tag_value_s2[34]);
  io.sockets.emit("sql_Weight1_Setting_s2", arr_tag_value_s2[35]);
  io.sockets.emit("sql_Weight2_Setting_s2", arr_tag_value_s2[36]);
  io.sockets.emit("sql_Weight3_Setting_s2", arr_tag_value_s2[37]);
  io.sockets.emit("sql_Weight1_Actual_s2", arr_tag_value_s2[38]);
  io.sockets.emit("sql_Weight2_Actual_s2", arr_tag_value_s2[39]);
  io.sockets.emit("sql_Weight3_Actual_s2", arr_tag_value_s2[40]);
  io.sockets.emit("sql_Time_Tron_Setting_s2", arr_tag_value_s2[41]);
  io.sockets.emit("sql_Time_Tron_Actual_s2", arr_tag_value_s2[42]);
  io.sockets.emit("on_System_s2", arr_tag_value[43]);
  io.sockets.emit("off_System_s2", arr_tag_value[44]);
  io.sockets.emit("Alarm_M1_s2", arr_tag_value_s2[45]);
  io.sockets.emit("Alarm_M2_s2", arr_tag_value_s2[46]);
  io.sockets.emit("Alarm_M3_s2", arr_tag_value_s2[47]);
  io.sockets.emit("Alarm_Mix_s2", arr_tag_value_s2[48]);
  io.sockets.emit("Alarm_Export_s2", arr_tag_value_s2[49]);
}
// ///////////GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)///////////
io.on("connection", function (socket) {
  socket.on("Client-send-data", function (data) {
    fn_tag();
  });
  fn_SQLSearch(); // Hàm tìm kiếm SQL
  fn_SQLSearch_ByTime(); // Hàm tìm kiếm theo thời gian
  fn_Require_ExcelExport(); // Nhận yêu cầu xuất Excel
  fn_AlarmSearch();
  fn_Alarm_Search_ByTime();
  fn_AL_Require_ExcelExport();
  fn_Mass_Search_ByTime();

  fn_SQLSearch_s2(); // Hàm tìm kiếm SQL
  fn_SQLSearch_ByTime_s2(); // Hàm tìm kiếm theo thời gian
  fn_Require_ExcelExport_s2(); // Nhận yêu cầu xuất Excel
  fn_AlarmSearch_s2();
  fn_Alarm_Search_ByTime_s2();
  fn_AL_Require_ExcelExport_s2();
  fn_Mass_Search_ByTime_s2();
});
// HÀM GHI DỮ LIỆU XUỐNG PLC
function valuesWritten(anythingBad) {
  if (anythingBad) {
    console.log("SOMETHING WENT WRONG WRITING VALUES!!!!");
  }
  console.log("Done writing.");
}
// ///////////DỮ LIỆU NÚT NHẤN ĐIỀU KHIỂN ///////////

// Station 1
io.on("connection", function (socket) {
  // ///////////KHỞI ĐỘNG HỆ THỐNG ///////////
  socket.on("cmd_on_System", function (data) {
    conn_plc.writeItems("on_System", data, valuesWritten);
  });
  socket.on("cmd_off_System", function (data) {
    conn_plc.writeItems("off_System", data, valuesWritten);
  });
  // ///////////MÀN CHẾ ĐỘ TỰ ĐỘNG ///////////
  // Nút nhấn chế độ tự động
  socket.on("cmd_Auto", function (data) {
    conn_plc.writeItems("btt_Auto", data, valuesWritten);
  });
  // Nút nhấn chế độ bằng tay
  socket.on("cmd_Manu", function (data) {
    conn_plc.writeItems("btt_Manu", data, valuesWritten);
  });
  // Nút nhấn confirm
  socket.on("cmd_Confirm", function (data) {
    conn_plc.writeItems("btt_Auto_Confirm", data, valuesWritten);
  });
  // Nút nhấn đẩy dữ liệu lên SQL
  socket.on("cmd_sql_on", function (data) {
    conn_plc.writeItems("sql_insert_On", data, valuesWritten);
  });
  socket.on("cmd_sql_off", function (data) {
    conn_plc.writeItems("sql_insert_Off", data, valuesWritten);
  });
  // Nút nhấn xóa dữ liệu SQL
  socket.on("cmd_sql_delete", function (data) {
    conn_plc.writeItems("sql_delete_Trigger", data, valuesWritten);
  });

  // ///////////MÀN CHẾ ĐỘ BẰNG TAY ///////////
  // Mở van 1
  socket.on("cmd_OpenV1", function (data) {
    conn_plc.writeItems("btt_V1_Open", data, valuesWritten);
  });
  // Đóng van 1
  socket.on("cmd_CloseV1", function (data) {
    conn_plc.writeItems("btt_V1_Close", data, valuesWritten);
  });
  // Mở van 2
  socket.on("cmd_OpenV2", function (data) {
    conn_plc.writeItems("btt_V2_Open", data, valuesWritten);
  });
  // Đóng van 2
  socket.on("cmd_CloseV2", function (data) {
    conn_plc.writeItems("btt_V2_Close", data, valuesWritten);
  });
  // Mở van 3
  socket.on("cmd_OpenV3", function (data) {
    conn_plc.writeItems("btt_V3_Open", data, valuesWritten);
  });
  // Đóng van 3
  socket.on("cmd_CloseV3", function (data) {
    conn_plc.writeItems("btt_V3_Close", data, valuesWritten);
  });
  // Chạy động cơ trộn
  socket.on("cmd_RunM", function (data) {
    conn_plc.writeItems("btt_DC_Tron_Run", data, valuesWritten);
  });
  // Dừng động cơ trộn
  socket.on("cmd_StopM", function (data) {
    conn_plc.writeItems("btt_DC_Tron_Stop", data, valuesWritten);
  });
  // Chạy động cơ trộn
  socket.on("cmd_RunE", function (data) {
    conn_plc.writeItems("btt_DC_Export_Run", data, valuesWritten);
  });
  // Dừng động cơ trộn
  socket.on("cmd_StopE", function (data) {
    conn_plc.writeItems("btt_DC_Export_Stop", data, valuesWritten);
  });

  // Ghi dữ liệu từ IO field màn hình tự động
  socket.on("cmd_Edit_Data", function (data) {
    conn_plc.writeItems(
      [
        "sql_OrderID",
        "Setting_Weight_1",
        "Setting_Weight_2",
        "Setting_Weight_3",
        "Setting_Time_Tron",
      ],
      [data[0], data[1], data[2], data[3], data[4]],
      valuesWritten
    );
  });
  socket.on("cmd_Edit_Data_Manu", function (data) {
    conn_plc.writeItems(["sql_OrderID"], [data[0]], valuesWritten);
  });
});

// Station 2
io.on("connection", function (socket) {
  // ///////////KHỞI ĐỘNG HỆ THỐNG ///////////
  socket.on("cmd_on_System_s2", function (data) {
    conn_plc_s2.writeItems("on_System_s2", data, valuesWritten);
  });
  socket.on("cmd_off_System_s2", function (data) {
    conn_plc_s2.writeItems("off_System_s2", data, valuesWritten);
  });
  // ///////////MÀN CHẾ ĐỘ TỰ ĐỘNG ///////////
  // Nút nhấn chế độ tự động
  socket.on("cmd_Auto_s2", function (data) {
    conn_plc_s2.writeItems("btt_Auto_s2", data, valuesWritten);
  });
  // Nút nhấn chế độ bằng tay
  socket.on("cmd_Manu_s2", function (data) {
    conn_plc_s2.writeItems("btt_Manu_s2", data, valuesWritten);
  });
  // Nút nhấn confirm
  socket.on("cmd_Confirm_s2", function (data) {
    conn_plc_s2.writeItems("btt_Auto_Confirm_s2", data, valuesWritten);
  });
  // Nút nhấn đẩy dữ liệu lên SQL
  socket.on("cmd_sql_on_s2", function (data) {
    conn_plc_s2.writeItems("sql_insert_On_s2", data, valuesWritten);
  });
  socket.on("cmd_sql_off_s2", function (data) {
    conn_plc_s2.writeItems("sql_insert_Off_s2", data, valuesWritten);
  });
  // Nút nhấn xóa dữ liệu SQL
  socket.on("cmd_sql_delete_s2", function (data) {
    conn_plc_s2.writeItems("sql_delete_Trigger_s2", data, valuesWritten);
  });

  // ///////////MÀN CHẾ ĐỘ BẰNG TAY ///////////
  // Mở van 1
  socket.on("cmd_OpenV1_s2", function (data) {
    conn_plc_s2.writeItems("btt_V1_Open_s2", data, valuesWritten);
  });
  // Đóng van 1
  socket.on("cmd_CloseV1_s2", function (data) {
    conn_plc_s2.writeItems("btt_V1_Close_s2", data, valuesWritten);
  });
  // Mở van 2
  socket.on("cmd_OpenV2_s2", function (data) {
    conn_plc_s2.writeItems("btt_V2_Open_s2", data, valuesWritten);
  });
  // Đóng van 2
  socket.on("cmd_CloseV2_s2", function (data) {
    conn_plc_s2.writeItems("btt_V2_Close_s2", data, valuesWritten);
  });
  // Mở van 3
  socket.on("cmd_OpenV3_s2", function (data) {
    conn_plc_s2.writeItems("btt_V3_Open_s2", data, valuesWritten);
  });
  // Đóng van 3
  socket.on("cmd_CloseV3_s2", function (data) {
    conn_plc_s2.writeItems("btt_V3_Close_s2", data, valuesWritten);
  });
  // Chạy động cơ trộn
  socket.on("cmd_RunM_s2", function (data) {
    conn_plc_s2.writeItems("btt_DC_Tron_Run_s2", data, valuesWritten);
  });
  // Dừng động cơ trộn
  socket.on("cmd_StopM_s2", function (data) {
    conn_plc_s2.writeItems("btt_DC_Tron_Stop_s2", data, valuesWritten);
  });
  // Chạy động cơ trộn
  socket.on("cmd_RunE_s2", function (data) {
    conn_plc_s2.writeItems("btt_DC_Export_Run_s2", data, valuesWritten);
  });
  // Dừng động cơ trộn
  socket.on("cmd_StopE_s2", function (data) {
    conn_plc_s2.writeItems("btt_DC_Export_Stop_s2", data, valuesWritten);
  });

  // Ghi dữ liệu từ IO field màn hình tự động
  socket.on("cmd_Edit_Data_s2", function (data) {
    conn_plc_s2.writeItems(
      [
        "sql_OrderID_s2",
        "Setting_Weight_1_s2",
        "Setting_Weight_2_s2",
        "Setting_Weight_3_s2",
        "Setting_Time_Tron_s2",
      ],
      [data[0], data[1], data[2], data[3], data[4]],
      valuesWritten
    );
  });
  socket.on("cmd_Edit_Data_Manu_s2", function (data) {
    conn_plc_s2.writeItems(["sql_OrderID_s2"], [data[0]], valuesWritten);
  });
});
// ///////////TẠO HÀM GHI DỮ LIỆU XUỐNG SQL/////////
function fn_sql_insert() {
  insert_trigger = arr_tag_value[29]; // Read trigger from PLC
  var sqltable_Name = process.env.TABLE_DATA_1;
  // Lấy thời gian hiện tại
  var tzoffset = new Date().getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
  var temp_datenow = new Date();
  var timeNow = new Date(temp_datenow - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");
  var timeNow_toSQL = "'" + timeNow + "',";

  // Dữ liệu đọc lên từ các tag
  var data_sql_OrderID = "'" + arr_tag_value[34] + "',";
  var data_sql_Weight1_Setting = "'" + arr_tag_value[35] + "',";
  var data_sql_Weight2_Setting = "'" + arr_tag_value[36] + "',";
  var data_sql_Weight3_Setting = "'" + arr_tag_value[37] + "',";
  var data_sql_Weight1_Actual = "'" + arr_tag_value[38] + "',";
  var data_sql_Weight2_Actual = "'" + arr_tag_value[39] + "',";
  var data_sql_Weight3_Actual = "'" + arr_tag_value[40] + "',";
  var data_sql_Time_Tron_Setting = "'" + arr_tag_value[41] + "',";
  var data_sql_Time_Tron_Actual = "'" + arr_tag_value[42] + "'";
  // Ghi dữ liệu vào SQL
  if (insert_trigger && !old_insert_trigger) {
    var sql_write_str11 =
      "INSERT INTO " +
      sqltable_Name +
      " (`Date`, `Order ID`, `Material 1 Setting`, `Material 2 Setting`, `Material 3 Setting`, `Mix Time Setting`, `Material 1 Actual`, `Material 2 Actual`, `Material 3 Actual`,`Mix Time Actual`) VALUES (";
    var sql_write_str12 =
      timeNow_toSQL +
      data_sql_OrderID +
      data_sql_Weight1_Setting +
      data_sql_Weight2_Setting +
      data_sql_Weight3_Setting +
      data_sql_Time_Tron_Setting +
      data_sql_Weight1_Actual +
      data_sql_Weight2_Actual +
      data_sql_Weight3_Actual +
      data_sql_Time_Tron_Actual;
    var sql_write_str1 = sql_write_str11 + sql_write_str12 + ");";
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon.query(sql_write_str1, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("SQL - Write Data Successfully");
      }
    });
  }
  old_insert_trigger = insert_trigger;
}
function fn_sql_insert_s2() {
  insert_trigger_s2 = arr_tag_value_s2[29]; // Read trigger from PLC
  var sqltable_Name_s2 = process.env.TABLE_DATA_2;
  // Lấy thời gian hiện tại
  var tzoffset = new Date().getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
  var temp_datenow = new Date();
  var timeNow = new Date(temp_datenow - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");
  var timeNow_toSQL = "'" + timeNow + "',";

  // Dữ liệu đọc lên từ các tag
  var data_sql_OrderID_s2 = "'" + arr_tag_value_s2[34] + "',";
  var data_sql_Weight1_Setting_s2 = "'" + arr_tag_value_s2[35] + "',";
  var data_sql_Weight2_Setting_s2 = "'" + arr_tag_value_s2[36] + "',";
  var data_sql_Weight3_Setting_s2 = "'" + arr_tag_value_s2[37] + "',";
  var data_sql_Weight1_Actual_s2 = "'" + arr_tag_value_s2[38] + "',";
  var data_sql_Weight2_Actual_s2 = "'" + arr_tag_value_s2[39] + "',";
  var data_sql_Weight3_Actual_s2 = "'" + arr_tag_value_s2[40] + "',";
  var data_sql_Time_Tron_Setting_s2 = "'" + arr_tag_value_s2[41] + "',";
  var data_sql_Time_Tron_Actual_s2 = "'" + arr_tag_value_s2[42] + "'";
  // Ghi dữ liệu vào SQL
  if (insert_trigger_s2 && !old_insert_trigger_s2) {
    var sql_write_str11_s2 =
      "INSERT INTO " +
      sqltable_Name_s2 +
      " (`Date`, `Order ID`, `Material 1 Setting`, `Material 2 Setting`, `Material 3 Setting`, `Mix Time Setting`, `Material 1 Actual`, `Material 2 Actual`, `Material 3 Actual`,`Mix Time Actual`) VALUES (";
    var sql_write_str12_s2 =
      timeNow_toSQL +
      data_sql_OrderID_s2 +
      data_sql_Weight1_Setting_s2 +
      data_sql_Weight2_Setting_s2 +
      data_sql_Weight3_Setting_s2 +
      data_sql_Time_Tron_Setting_s2 +
      data_sql_Weight1_Actual_s2 +
      data_sql_Weight2_Actual_s2 +
      data_sql_Weight3_Actual_s2 +
      data_sql_Time_Tron_Actual_s2;
    var sql_write_str1_s2 = sql_write_str11_s2 + sql_write_str12_s2 + ");";
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon_s2.query(sql_write_str1_s2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("SQL - Write Data Successfully");
      }
    });
  }
  old_insert_trigger_s2 = insert_trigger_s2;
}

function fn_sql_insert_mass() {
  insert_trigger = arr_tag_value[30]; // Read trigger from PLC
  var sqltable_Name = process.env.TABLE_MASS_1;
  // Lấy thời gian hiện tại
  var tzoffset = new Date().getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
  var temp_datenow = new Date();
  var timeNow = new Date(temp_datenow - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");
  var timeNow_toSQL = "'" + timeNow + "',";

  // Dữ liệu đọc lên từ các tag
  var data_sql_OrderID = "'" + arr_tag_value[34] + "',";
  var data_sql_Weight1_Setting = "'" + arr_tag_value[35] + "',";
  var data_sql_Weight2_Setting = "'" + arr_tag_value[36] + "',";
  var data_sql_Weight3_Setting = "'" + arr_tag_value[37] + "',";
  var data_sql_Time_Tron_Setting = "'" + arr_tag_value[41] + "'";
  // Ghi dữ liệu vào SQL
  if (insert_trigger && !old_insert_trigger) {
    var sql_write_str11 =
      "INSERT INTO " +
      sqltable_Name +
      " (`Date`, `Order ID`, `Material 1 Setting`, `Material 2 Setting`, `Material 3 Setting`, `Mix Time Setting`) VALUES (";
    var sql_write_str12 =
      timeNow_toSQL +
      data_sql_OrderID +
      data_sql_Weight1_Setting +
      data_sql_Weight2_Setting +
      data_sql_Weight3_Setting +
      data_sql_Time_Tron_Setting;
    var sql_write_str1 = sql_write_str11 + sql_write_str12 + ");";
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon.query(sql_write_str1, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("SQL - Write Data Successfully");
      }
    });
  }
  old_insert_trigger = insert_trigger;
}
function fn_sql_insert_mass_s2() {
  insert_trigger_s2 = arr_tag_value_s2[30]; // Read trigger from PLC
  var sqltable_Name_s2 = process.env.TABLE_MASS_2;
  // Lấy thời gian hiện tại
  var tzoffset = new Date().getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
  var temp_datenow = new Date();
  var timeNow = new Date(temp_datenow - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");
  var timeNow_toSQL = "'" + timeNow + "',";

  // Dữ liệu đọc lên từ các tag
  var data_sql_OrderID_s2 = "'" + arr_tag_value_s2[34] + "',";
  var data_sql_Weight1_Setting_s2 = "'" + arr_tag_value_s2[35] + "',";
  var data_sql_Weight2_Setting_s2 = "'" + arr_tag_value_s2[36] + "',";
  var data_sql_Weight3_Setting_s2 = "'" + arr_tag_value_s2[37] + "',";
  var data_sql_Time_Tron_Setting_s2 = "'" + arr_tag_value_s2[41] + "'";
  // Ghi dữ liệu vào SQL
  if (insert_trigger_s2 && !old_insert_trigger_s2) {
    var sql_write_str11_s2 =
      "INSERT INTO " +
      sqltable_Name_s2 +
      " (`Date`, `Order ID`, `Material 1 Setting`, `Material 2 Setting`, `Material 3 Setting`, `Mix Time Setting`) VALUES (";
    var sql_write_str12_s2 =
      timeNow_toSQL +
      data_sql_OrderID_s2 +
      data_sql_Weight1_Setting_s2 +
      data_sql_Weight2_Setting_s2 +
      data_sql_Weight3_Setting_s2 +
      data_sql_Time_Tron_Setting_s2;
    var sql_write_str1_s2 = sql_write_str11_s2 + sql_write_str12_s2 + ");";
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon_s2.query(sql_write_str1_s2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("SQL - Write Data Successfully");
      }
    });
  }
  old_insert_trigger_s2 = insert_trigger_s2;
}
// ///////////TẠO HÀM XÓA DỮ LIỆU BẢNG SQL////////////////
function fn_sql_delete() {
  delete_trigger = arr_tag_value[33];
  var sqltable_Name = process.env.TABLE_DATA_1;
  var sqltable_Mass = process.env.TABLE_MASS_1;
  var sqltable_Alarm = process.env.TABLE_ALARM_1;
  // Ghi dữ liệu vào SQL
  if (delete_trigger == true && delete_trigger != old_delete_trigger) {
    var sql_delete_data = "DELETE FROM " + sqltable_Name;
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon.query(sql_delete_data, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("SQL - Delete Data Successfully");
      }
    });
    var sql_delete_mass = "DELETE FROM " + sqltable_Mass;
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon.query(sql_delete_mass, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Mass - Delete Data Successfully");
      }
    });
    var sql_delete_alarm = "DELETE FROM " + sqltable_Alarm;
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon.query(sql_delete_alarm, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Alarm - Delete Data Successfully");
      }
    });
  }
  old_delete_trigger = delete_trigger;
}

function fn_sql_delete_s2() {
  delete_trigger_s2 = arr_tag_value_s2[33];
  var sqltable_Name_s2 = process.env.TABLE_DATA_2;
  var sqltable_Mass_s2 = process.env.TABLE_MASS_2;
  var sqltable_Alarm_s2 = process.env.TABLE_ALARM_2;
  // Ghi dữ liệu vào SQL
  if (delete_trigger_s2 == true && delete_trigger_s2 != old_delete_trigger_s2) {
    var sql_delete_data_s2 = "DELETE FROM " + sqltable_Name_s2;
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon_s2.query(sql_delete_data_s2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("SQL - Delete Data Successfully");
      }
    });
    var sql_delete_mass_s2 = "DELETE FROM " + sqltable_Mass_s2;
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon_s2.query(sql_delete_mass_s2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Mass - Delete Data Successfully");
      }
    });
    var sql_delete_alarm_s2 = "DELETE FROM " + sqltable_Alarm_s2;
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon_s2.query(sql_delete_alarm_s2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Alarm - Delete Data Successfully");
      }
    });
  }
  old_delete_trigger_s2 = delete_trigger_s2;
}
// ////////////ĐỌC DỮ LIỆU TỪ SQL GHI VÔ BẢNG/////////////////
function fn_SQLSearch() {
  io.on("connection", function (socket) {
    socket.on("msg_SQL_Show", function (data) {
      var sqltable_Name = process.env.TABLE_DATA_1;
      var queryy1 = "SELECT * FROM " + sqltable_Name + ";";
      sqlcon.query(queryy1, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          socket.emit("SQL_Show", convertedResponse);
          console.log(convertedResponse);
        }
      });
    });
  });
}

function fn_SQLSearch_s2() {
  io.on("connection", function (socket) {
    socket.on("msg_SQL_Show_s2", function (data) {
      var sqltable_Name_s2 = process.env.TABLE_DATA_2;
      var queryy1 = "SELECT * FROM " + sqltable_Name_s2 + ";";
      sqlcon_s2.query(queryy1, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          socket.emit("SQL_Show_s2", convertedResponse);
          console.log(convertedResponse);
        }
      });
    });
  });
}
// ///////////ĐỌC DỮ LIỆU SQL THEO THỜI GIAN/////////////////
function fn_SQLSearch_ByTime() {
  io.on("connection", function (socket) {
    socket.on("msg_SQL_ByTime", function (data) {
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
      // Lấy thời gian tìm kiếm từ date time piker
      var timeS = new Date(data[0]); // Thời gian bắt đầu
      var timeE = new Date(data[1]); // Thời gian kết thúc
      // Quy đổi thời gian ra định dạng cua MySQL
      var timeS1 =
        "'" +
        new Date(timeS - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeE1 =
        "'" +
        new Date(timeE - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

      var sqltable_Name = process.env.TABLE_DATA_1; // Tên bảng
      var dt_col_Name = "Date"; // Tên cột thời gian

      var Query1 =
        "SELECT * FROM " +
        sqltable_Name +
        " WHERE " +
        dt_col_Name +
        " BETWEEN ";
      var Query = Query1 + timeR + ";";

      sqlcon.query(Query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          SQL_Excel = convertedResponse; // Xuất báo cáo Excel
          socket.emit("SQL_ByTime", convertedResponse);
        }
      });
    });
  });
}

function fn_SQLSearch_ByTime_s2() {
  io.on("connection", function (socket) {
    socket.on("msg_SQL_ByTime_s2", function (data) {
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
      // Lấy thời gian tìm kiếm từ date time piker
      var timeS = new Date(data[0]); // Thời gian bắt đầu
      var timeE = new Date(data[1]); // Thời gian kết thúc
      // Quy đổi thời gian ra định dạng cua MySQL
      var timeS1 =
        "'" +
        new Date(timeS - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeE1 =
        "'" +
        new Date(timeE - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

      var sqltable_Name_s2 = process.env.TABLE_DATA_2; // Tên bảng
      var dt_col_Name_s2 = "Date"; // Tên cột thời gian

      var Query1 =
        "SELECT * FROM " +
        sqltable_Name_s2 +
        " WHERE " +
        dt_col_Name_s2 +
        " BETWEEN ";
      var Query = Query1 + timeR + ";";

      sqlcon_s2.query(Query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          SQL_Excel_s2 = convertedResponse; // Xuất báo cáo Excel
          socket.emit("SQL_ByTime_s2", convertedResponse);
        }
      });
    });
  });
}

function fn_Mass_Search_ByTime() {
  io.on("connection", function (socket) {
    socket.on("msg_SQL_Mass_ByTime", function (data) {
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
      // Lấy thời gian tìm kiếm từ date time piker
      var timeS = new Date(data[0]); // Thời gian bắt đầu
      var timeE = new Date(data[1]); // Thời gian kết thúc
      // Quy đổi thời gian ra định dạng cua MySQL
      var timeS1 =
        "'" +
        new Date(timeS - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeE1 =
        "'" +
        new Date(timeE - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

      var sqltable_Name = process.env.TABLE_MASS_1; // Tên bảng
      var dt_col_Name = "Date"; // Tên cột thời gian

      var Query1 =
        "SELECT * FROM " +
        sqltable_Name +
        " WHERE " +
        dt_col_Name +
        " BETWEEN ";
      var Query = Query1 + timeR + ";";

      sqlcon.query(Query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          Mass_Excel = convertedResponse; // Xuất báo cáo Excel
        }
      });
    });
  });
}

function fn_Mass_Search_ByTime_s2() {
  io.on("connection", function (socket) {
    socket.on("msg_SQL_Mass_ByTime_s2", function (data) {
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
      // Lấy thời gian tìm kiếm từ date time piker
      var timeS = new Date(data[0]); // Thời gian bắt đầu
      var timeE = new Date(data[1]); // Thời gian kết thúc
      // Quy đổi thời gian ra định dạng cua MySQL
      var timeS1 =
        "'" +
        new Date(timeS - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeE1 =
        "'" +
        new Date(timeE - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

      var sqltable_Name = process.env.TABLE_MASS_2; // Tên bảng
      var dt_col_Name = "Date"; // Tên cột thời gian

      var Query1 =
        "SELECT * FROM " +
        sqltable_Name +
        " WHERE " +
        dt_col_Name +
        " BETWEEN ";
      var Query = Query1 + timeR + ";";

      sqlcon_s2.query(Query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          Mass_Excel_s2 = convertedResponse; // Xuất báo cáo Excel
        }
      });
    });
  });
}
// /////////////////////////////// BÁO CÁO EXCEL ///////////////////////////////
const Excel = require("exceljs");
const { CONNREFUSED } = require("dns");
function fn_excelExport() {
  // =====================CÁC THUỘC TÍNH CHUNG=====================
  // Lấy ngày tháng hiện tại
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let day = date_ob.getDay();
  var dayName = "";
  if (day == 0) {
    dayName = "Sunday,";
  } else if (day == 1) {
    dayName = "Monday,";
  } else if (day == 2) {
    dayName = "Tuesday,";
  } else if (day == 3) {
    dayName = "Wednesday,";
  } else if (day == 4) {
    dayName = "Thursday,";
  } else if (day == 5) {
    dayName = "Friday,";
  } else if (day == 6) {
    dayName = "Saturday,";
  } else {
  }
  // Tạo và khai báo Excel
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Production Report", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { tabColor: { argb: "FFC0000" } },
  });
  // Page setup (cài đặt trang)
  worksheet.properties.defaultRowHeight = 20;
  worksheet.pageSetup.margins = {
    left: 0.3,
    right: 0.25,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3,
  };
  // =====================THẾT KẾ HEADER=====================
  const imageId1 = workbook.addImage({
    filename: "src/public/images/Logo/bk_name_en.png",
    extension: "png",
  });
  worksheet.addImage(imageId1, "A2:D5");
  const imageId2 = workbook.addImage({
    filename: "src/public/images/Logo/OIP.jpg",
    extension: "jpg",
  });
  worksheet.addImage(imageId2, "L1:L6");

  worksheet.mergeCells("A2:D5");
  worksheet.mergeCells("A1:K1");
  worksheet.mergeCells("L1:L6");
  worksheet.mergeCells("E2:H2");
  worksheet.mergeCells("E3:H3");
  worksheet.mergeCells("E4:H4");
  worksheet.mergeCells("E5:H5");
  worksheet.mergeCells("J2:K2");
  worksheet.mergeCells("J3:K3");
  worksheet.mergeCells("J4:K4");
  worksheet.mergeCells("J5:K5");
  worksheet.mergeCells("A6:K6");
  worksheet.mergeCells("A7:L7");
  worksheet.mergeCells("A8:I8");
  worksheet.mergeCells("J8:L8");

  worksheet.getCell("A1").value = "GRADUATION PROJECT - EE4357";
  worksheet.getCell("A1").style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 12,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1f497d" } },
  };
  worksheet.getCell("E2").value =
    "Faculty : Electrical and Electronic Engineering";
  worksheet.getCell("E2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E3").value =
    "Major   : Control Engineering and Automation";
  worksheet.getCell("E3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E4").value =
    "Address : 268 Ly Thuong Kiet, Ward 14, District 10, HCM City";
  worksheet.getCell("E4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J2").value = "Name   : Nguyen Minh Thai";
  worksheet.getCell("J2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J3").value = "Code   : 1910526";
  worksheet.getCell("J3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J4").value = "Tel    : 0342400518";
  worksheet.getCell("J4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J5").value = "Mentor : Nguyen Trong Tai";
  worksheet.getCell("J5").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };

  worksheet.getCell("A7").value = "PRODUCTION REPORT 1";
  worksheet.getCell("A7").style = {
    font: {
      name: "Times New Roman",
      bold: true,
      size: 16,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1488db" } },
  };
  worksheet.getCell("A8").style = {
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "132d64" } },
  };
  worksheet.getCell("J8").value =
    "Time Line: " +
    dayName +
    date +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  worksheet.getCell("J8").style = {
    font: {
      name: "Times New Roman",
      bold: false,
      italic: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "right", vertical: "bottom", wrapText: false },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "062251" } },
  };

  // Tên nhãn các cột
  var rowpos = 9;
  var collumName = [
    "STT",
    "Date",
    "Order ID",
    "Material 1 Setting",
    "Material 2 Setting",
    "Material 3 Setting",
    "Mix Time Setting",
    "Material 1 Actual",
    "Material 2 Actual",
    "Material 3 Actual",
    "Mix Time Actual",
    "Note",
  ];
  worksheet.spliceRows(rowpos, 1, collumName);

  // =====================XUẤT DỮ LIỆU SQL LÊN EXCEL  =====================
  // Dump all the data into Excel
  var rowIndex = 0;
  SQL_Excel.forEach((e, index) => {
    rowIndex = index + rowpos;
    worksheet.columns = [
      { key: "STT" },
      { key: "Date" },
      { key: "Order ID" },
      { key: "Material 1 Setting" },
      { key: "Material 2 Setting" },
      { key: "Material 3 Setting" },
      { key: "Mix Time Setting" },
      { key: "Material 1 Actual" },
      { key: "Material 2 Actual" },
      { key: "Material 3 Actual" },
      { key: "Mix Time Actual" },
    ];
    worksheet.addRow({
      STT: {
        formula: index + 1,
      },
      ...e, //Kết thúc ghi dữ liệu
    });
  });
  // Lấy tổng số hàng
  const totalNumberOfRows = worksheet.rowCount;
  // =====================STYLE CHO CÁC HÀNG DỮ LIỆU =====================
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    var datastartrow = rowpos;
    var rowindex = rowNumber + datastartrow;
    const rowlength = datastartrow + SQL_Excel.length;
    if (rowindex >= rowlength + 1) {
      rowindex = rowlength + 1;
    }
    const insideColumns = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
    ];
    // Tạo border
    insideColumns.forEach((v) => {
      // Border
      (worksheet.getCell(`${v}${rowindex}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      }),
        // Alignment
        (worksheet.getCell(`${v}${rowindex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        }),
        // Font
        (worksheet.getCell(`${v}${rowindex}`).font = {
          name: "Cascadia Code",
          bold: true,
          size: 12,
        });
    });
  });
  // =======================STYLE CHO HÀNG TỔNG CỘNG======================
  const total_row = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  total_row.forEach((v) => {
    worksheet.getCell(`${v}${totalNumberOfRows + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "062251" },
    };
  });

  // ====================STYLE CÁC CỘT/ HÀNG ===============================
  const HeaderStyle = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  HeaderStyle.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).style = {
      font: { name: "Times New Roman", bold: true },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };
    worksheet.getCell(`${v}${rowpos}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  // Cài đặt độ rộng cột
  worksheet.columns.forEach((column, index) => {
    column.width = 20;
  });
  // Set width column
  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 30;
  worksheet.getColumn(12).width = 30;
  // Set height row
  worksheet.getRow(7).height = 36;
  worksheet.getRow(9).height = 36;
  // =====================THẾT KẾ FOOTER=====================
  worksheet.getCell(`L${totalNumberOfRows + 2}`).value =
    "Day........Month........Year........";
  worksheet.getCell(`L${totalNumberOfRows + 2}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "right", vertical: "middle", wrapText: false },
  };

  worksheet.getCell(`B${totalNumberOfRows + 3}`).value = "Giám đốc";
  worksheet.getCell(`B${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`B${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`B${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`G${totalNumberOfRows + 3}`).value = "Trưởng ca";
  worksheet.getCell(`G${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`G${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`G${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`L${totalNumberOfRows + 3}`).value = "Người in biểu";
  worksheet.getCell(`L${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`L${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`L${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
  // Export Link
  var currentTime =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  var saveasDirect = "reports/product/Report_" + currentTime + ".xlsx";
  SaveAslink = saveasDirect; // Send to client
  var booknameLink = "src/public/" + saveasDirect;

  var Bookname = "Report_" + currentTime + ".xlsx";
  // Write book name
  workbook.xlsx.writeFile(booknameLink);

  // Return
  return [SaveAslink, Bookname];
}

function fn_excelExport_s2() {
  // =====================CÁC THUỘC TÍNH CHUNG=====================
  // Lấy ngày tháng hiện tại
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let day = date_ob.getDay();
  var dayName = "";
  if (day == 0) {
    dayName = "Sunday,";
  } else if (day == 1) {
    dayName = "Monday,";
  } else if (day == 2) {
    dayName = "Tuesday,";
  } else if (day == 3) {
    dayName = "Wednesday,";
  } else if (day == 4) {
    dayName = "Thursday,";
  } else if (day == 5) {
    dayName = "Friday,";
  } else if (day == 6) {
    dayName = "Saturday,";
  } else {
  }
  // Tạo và khai báo Excel
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Production Report 2", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { tabColor: { argb: "FFC0000" } },
  });
  // Page setup (cài đặt trang)
  worksheet.properties.defaultRowHeight = 20;
  worksheet.pageSetup.margins = {
    left: 0.3,
    right: 0.25,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3,
  };
  // =====================THẾT KẾ HEADER=====================
  const imageId1 = workbook.addImage({
    filename: "src/public/images/Logo/bk_name_en.png",
    extension: "png",
  });
  worksheet.addImage(imageId1, "A2:D5");
  const imageId2 = workbook.addImage({
    filename: "src/public/images/Logo/OIP.jpg",
    extension: "jpg",
  });
  worksheet.addImage(imageId2, "L1:L6");

  worksheet.mergeCells("A2:D5");
  worksheet.mergeCells("A1:K1");
  worksheet.mergeCells("L1:L6");
  worksheet.mergeCells("E2:H2");
  worksheet.mergeCells("E3:H3");
  worksheet.mergeCells("E4:H4");
  worksheet.mergeCells("E5:H5");
  worksheet.mergeCells("J2:K2");
  worksheet.mergeCells("J3:K3");
  worksheet.mergeCells("J4:K4");
  worksheet.mergeCells("J5:K5");
  worksheet.mergeCells("A6:K6");
  worksheet.mergeCells("A7:L7");
  worksheet.mergeCells("A8:I8");
  worksheet.mergeCells("J8:L8");

  worksheet.getCell("A1").value = "GRADUATION PROJECT - EE4357";
  worksheet.getCell("A1").style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 12,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1f497d" } },
  };
  worksheet.getCell("E2").value =
    "Faculty : Electrical and Electronic Engineering";
  worksheet.getCell("E2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E3").value =
    "Major   : Control Engineering and Automation";
  worksheet.getCell("E3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E4").value =
    "Address : 268 Ly Thuong Kiet, Ward 14, District 10, HCM City";
  worksheet.getCell("E4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J2").value = "Name   : Nguyen Minh Thai";
  worksheet.getCell("J2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J3").value = "Code   : 1910526";
  worksheet.getCell("J3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J4").value = "Tel    : 0342400518";
  worksheet.getCell("J4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J5").value = "Mentor : Nguyen Trong Tai";
  worksheet.getCell("J5").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };

  worksheet.getCell("A7").value = "PRODUCTION REPORT 2";
  worksheet.getCell("A7").style = {
    font: {
      name: "Times New Roman",
      bold: true,
      size: 16,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1488db" } },
  };
  worksheet.getCell("A8").style = {
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "132d64" } },
  };
  worksheet.getCell("J8").value =
    "Time Line: " +
    dayName +
    date +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  worksheet.getCell("J8").style = {
    font: {
      name: "Times New Roman",
      bold: false,
      italic: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "right", vertical: "bottom", wrapText: false },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "062251" } },
  };

  // Tên nhãn các cột
  var rowpos = 9;
  var collumName = [
    "STT",
    "Date",
    "Order ID",
    "Material 1 Setting",
    "Material 2 Setting",
    "Material 3 Setting",
    "Mix Time Setting",
    "Material 1 Actual",
    "Material 2 Actual",
    "Material 3 Actual",
    "Mix Time Actual",
    "Note",
  ];
  worksheet.spliceRows(rowpos, 1, collumName);

  // =====================XUẤT DỮ LIỆU SQL LÊN EXCEL  =====================
  // Dump all the data into Excel
  var rowIndex = 0;
  SQL_Excel_s2.forEach((e, index) => {
    rowIndex = index + rowpos;
    worksheet.columns = [
      { key: "STT" },
      { key: "Date" },
      { key: "Order ID" },
      { key: "Material 1 Setting" },
      { key: "Material 2 Setting" },
      { key: "Material 3 Setting" },
      { key: "Mix Time Setting" },
      { key: "Material 1 Actual" },
      { key: "Material 2 Actual" },
      { key: "Material 3 Actual" },
      { key: "Mix Time Actual" },
    ];
    worksheet.addRow({
      STT: {
        formula: index + 1,
      },
      ...e, //Kết thúc ghi dữ liệu
    });
  });
  // Lấy tổng số hàng
  const totalNumberOfRows = worksheet.rowCount;

  // =====================STYLE CHO CÁC HÀNG DỮ LIỆU =====================
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    var datastartrow = rowpos;
    var rowindex = rowNumber + datastartrow;
    const rowlength = datastartrow + SQL_Excel_s2.length;
    if (rowindex >= rowlength + 1) {
      rowindex = rowlength + 1;
    }
    const insideColumns = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
    ];
    // Tạo border
    insideColumns.forEach((v) => {
      // Border
      (worksheet.getCell(`${v}${rowindex}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      }),
        // Alignment
        (worksheet.getCell(`${v}${rowindex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        }),
        // Font
        (worksheet.getCell(`${v}${rowindex}`).font = {
          name: "Cascadia Code",
          bold: true,
          size: 12,
        });
    });
  });
  // =======================STYLE CHO HÀNG TỔNG CỘNG======================
  // Tô màu cho hàng total (Tổng cộng)
  const total_row = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  total_row.forEach((v) => {
    worksheet.getCell(`${v}${totalNumberOfRows + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "062251" },
    };
  });

  // ====================STYLE CÁC CỘT/ HÀNG ===============================
  const HeaderStyle = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  HeaderStyle.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).style = {
      font: { name: "Times New Roman", bold: true },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };
    worksheet.getCell(`${v}${rowpos}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  // Cài đặt độ rộng cột
  worksheet.columns.forEach((column, index) => {
    column.width = 20;
  });
  // Set width column
  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 30;
  worksheet.getColumn(12).width = 30;
  // Set height row
  worksheet.getRow(7).height = 36;
  worksheet.getRow(9).height = 36;
  // =====================THẾT KẾ FOOTER=====================
  worksheet.getCell(`L${totalNumberOfRows + 2}`).value =
    "Day........Month........Year........";
  worksheet.getCell(`L${totalNumberOfRows + 2}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "right", vertical: "middle", wrapText: false },
  };

  worksheet.getCell(`B${totalNumberOfRows + 3}`).value = "Giám đốc";
  worksheet.getCell(`B${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`B${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`B${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`G${totalNumberOfRows + 3}`).value = "Trưởng ca";
  worksheet.getCell(`G${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`G${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`G${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`L${totalNumberOfRows + 3}`).value = "Người in biểu";
  worksheet.getCell(`L${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`L${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`L${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
  // Export Link
  var currentTime =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  var saveasDirect = "reports/product_s2/Report_s2_" + currentTime + ".xlsx";
  SaveAslink = saveasDirect; // Send to client
  var booknameLink = "src/public/" + saveasDirect;

  var Bookname = "Report_s2_" + currentTime + ".xlsx";
  // Write book name
  workbook.xlsx.writeFile(booknameLink);

  // Return
  return [SaveAslink, Bookname];
}

function fn_massExport() {
  // =====================CÁC THUỘC TÍNH CHUNG=====================
  // Lấy ngày tháng hiện tại
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let day = date_ob.getDay();
  var dayName = "";
  if (day == 0) {
    dayName = "Sunday,";
  } else if (day == 1) {
    dayName = "Monday,";
  } else if (day == 2) {
    dayName = "Tuesday,";
  } else if (day == 3) {
    dayName = "Wednesday,";
  } else if (day == 4) {
    dayName = "Thursday,";
  } else if (day == 5) {
    dayName = "Friday,";
  } else if (day == 6) {
    dayName = "Saturday,";
  } else {
  }
  // Tạo và khai báo Excel
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Total Report 1", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { tabColor: { argb: "FFC0000" } },
  });
  // Page setup (cài đặt trang)
  worksheet.properties.defaultRowHeight = 20;
  worksheet.pageSetup.margins = {
    left: 0.3,
    right: 0.25,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3,
  };
  // =====================THẾT KẾ HEADER=====================
  const imageId1 = workbook.addImage({
    filename: "src/public/images/Logo/bk_name_en.png",
    extension: "png",
  });
  worksheet.addImage(imageId1, "A2:D5");
  const imageId2 = workbook.addImage({
    filename: "src/public/images/Logo/OIP.jpg",
    extension: "jpg",
  });
  worksheet.addImage(imageId2, "L1:L6");

  worksheet.mergeCells("A2:D5");
  worksheet.mergeCells("A1:K1");
  worksheet.mergeCells("L1:L6");
  worksheet.mergeCells("E2:H2");
  worksheet.mergeCells("E3:H3");
  worksheet.mergeCells("E4:H4");
  worksheet.mergeCells("E5:H5");
  worksheet.mergeCells("J2:K2");
  worksheet.mergeCells("J3:K3");
  worksheet.mergeCells("J4:K4");
  worksheet.mergeCells("J5:K5");
  worksheet.mergeCells("A6:K6");
  worksheet.mergeCells("C7:J7");
  worksheet.mergeCells("C8:G8");
  worksheet.mergeCells("H8:J8");

  worksheet.getCell("A1").value = "GRADUATION PROJECT - EE4357";
  worksheet.getCell("A1").style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 12,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1f497d" } },
  };
  worksheet.getCell("E2").value =
    "Faculty : Electrical and Electronic Engineering";
  worksheet.getCell("E2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E3").value =
    "Major   : Control Engineering and Automation";
  worksheet.getCell("E3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E4").value =
    "Address : 268 Ly Thuong Kiet, Ward 14, District 10, HCM City";
  worksheet.getCell("E4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J2").value = "Name   : Nguyen Minh Thai";
  worksheet.getCell("J2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J3").value = "Code   : 1910526";
  worksheet.getCell("J3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J4").value = "Tel    : 0342400518";
  worksheet.getCell("J4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J5").value = "Mentor : Nguyen Trong Tai";
  worksheet.getCell("J5").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };

  worksheet.getCell("C7").value = "MASS REPORT 1";
  worksheet.getCell("C7").style = {
    font: {
      name: "Times New Roman",
      bold: true,
      size: 16,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1488db" } },
  };
  worksheet.getCell("C8").style = {
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "132d64" } },
  };
  worksheet.getCell("H8").value =
    "Time Line: " +
    dayName +
    date +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  worksheet.getCell("H8").style = {
    font: {
      name: "Times New Roman",
      bold: false,
      italic: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "right", vertical: "bottom", wrapText: false },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "062251" } },
  };

  // Tên nhãn các cột
  var rowpos = 9;
  var collumName = [
    "",
    "",
    "STT",
    "Date",
    "Order ID",
    "Material 1 Setting",
    "Material 2 Setting",
    "Material 3 Setting",
    "Mix Time Setting",
    "Note",
  ];
  worksheet.spliceRows(rowpos, 1, collumName);

  // =====================XUẤT DỮ LIỆU SQL LÊN EXCEL  =====================
  // Dump all the data into Excel
  var rowIndex = 0;
  Mass_Excel.forEach((e, index) => {
    rowIndex = index + rowpos;
    worksheet.columns = [
      { key: "" },
      { key: "" },
      { key: "STT" },
      { key: "Date" },
      { key: "Order ID" },
      { key: "Material 1 Setting" },
      { key: "Material 2 Setting" },
      { key: "Material 3 Setting" },
      { key: "Mix Time Setting" },
    ];
    worksheet.addRow({
      STT: {
        formula: index + 1,
      },
      ...e, //Kết thúc ghi dữ liệu
    });
  });
  // Lấy tổng số hàng
  const totalNumberOfRows = worksheet.rowCount;
  // Tính tổng
  worksheet.addRow([
    "",
    "",
    "Total",
    "",
    "",
    { formula: `=sum(F${rowpos + 1}:F${totalNumberOfRows})` },
    { formula: `=sum(G${rowpos + 1}:G${totalNumberOfRows})` },
    { formula: `=sum(H${rowpos + 1}:H${totalNumberOfRows})` },
    { formula: `=sum(I${rowpos + 1}:I${totalNumberOfRows})` },
  ]);

  // =====================STYLE CHO CÁC HÀNG DỮ LIỆU =====================
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    var datastartrow = rowpos;
    var rowindex = rowNumber + datastartrow;
    const rowlength = datastartrow + Mass_Excel.length;
    if (rowindex >= rowlength + 1) {
      rowindex = rowlength + 1;
    }
    const insideColumns = ["C", "D", "E", "F", "G", "H", "I", "J"];
    // Tạo border
    insideColumns.forEach((v) => {
      // Border
      (worksheet.getCell(`${v}${rowindex}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      }),
        // Alignment
        (worksheet.getCell(`${v}${rowindex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        }),
        // Font
        (worksheet.getCell(`${v}${rowindex}`).font = {
          name: "Cascadia Code",
          bold: true,
          size: 12,
        });
    });
  });
  // =======================STYLE CHO HÀNG TỔNG CỘNG======================
  worksheet.getCell(`A${totalNumberOfRows + 1}`).style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center" },
  };
  // Tô màu cho hàng total (Tổng cộng)
  const total_row = ["C", "D", "E", "F", "G", "H", "I", "J"];
  total_row.forEach((v) => {
    (worksheet.getCell(`${v}${totalNumberOfRows + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "062251" },
    }),
      (worksheet.getCell(`${v}${totalNumberOfRows + 1}`).font = {
        name: "Cascadia Code",
        bold: true,
        size: 14,
        color: { argb: "ffffff" },
      });
  });

  // ====================STYLE CÁC CỘT/ HÀNG ===============================
  const HeaderStyle = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  const HeaderStyle2 = ["C", "D", "E", "F", "G", "H", "I", "J"];
  HeaderStyle.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).style = {
      font: { name: "Times New Roman", bold: true },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };
  });
  HeaderStyle2.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  // Cài đặt độ rộng cột
  worksheet.columns.forEach((column, index) => {
    column.width = 30;
  });
  // Set width column
  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 50;
  worksheet.getColumn(12).width = 30;
  // Set height row
  worksheet.getRow(7).height = 36;
  worksheet.getRow(9).height = 36;
  // =====================THẾT KẾ FOOTER=====================
  worksheet.getCell(`J${totalNumberOfRows + 2}`).value =
    "Day........Month........Year........";
  worksheet.getCell(`J${totalNumberOfRows + 2}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "right", vertical: "middle", wrapText: false },
  };

  worksheet.getCell(`C${totalNumberOfRows + 3}`).value = "Giám đốc";
  worksheet.getCell(`C${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`C${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`C${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`F${totalNumberOfRows + 3}`).value = "Trưởng ca";
  worksheet.getCell(`F${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`F${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`F${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`J${totalNumberOfRows + 3}`).value = "Người in biểu";
  worksheet.getCell(`J${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`J${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`J${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
  // Export Link
  var currentTime =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  var saveasDirect = "reports/mass/Mass_" + currentTime + ".xlsx";
  SaveAslink = saveasDirect; // Send to client
  var booknameLink = "src/public/" + saveasDirect;

  var Bookname = "Mass_" + currentTime + ".xlsx";
  // Write book name
  workbook.xlsx.writeFile(booknameLink);

  // Return
  return [SaveAslink, Bookname];
}

function fn_massExport_s2() {
  // =====================CÁC THUỘC TÍNH CHUNG=====================
  // Lấy ngày tháng hiện tại
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let day = date_ob.getDay();
  var dayName = "";
  if (day == 0) {
    dayName = "Sunday,";
  } else if (day == 1) {
    dayName = "Monday,";
  } else if (day == 2) {
    dayName = "Tuesday,";
  } else if (day == 3) {
    dayName = "Wednesday,";
  } else if (day == 4) {
    dayName = "Thursday,";
  } else if (day == 5) {
    dayName = "Friday,";
  } else if (day == 6) {
    dayName = "Saturday,";
  } else {
  }
  // Tạo và khai báo Excel
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Total Report 2", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { tabColor: { argb: "FFC0000" } },
  });
  // Page setup (cài đặt trang)
  worksheet.properties.defaultRowHeight = 20;
  worksheet.pageSetup.margins = {
    left: 0.3,
    right: 0.25,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3,
  };
  // =====================THẾT KẾ HEADER=====================
  const imageId1 = workbook.addImage({
    filename: "src/public/images/Logo/bk_name_en.png",
    extension: "png",
  });
  worksheet.addImage(imageId1, "A2:D5");
  const imageId2 = workbook.addImage({
    filename: "src/public/images/Logo/OIP.jpg",
    extension: "jpg",
  });
  worksheet.addImage(imageId2, "L1:L6");

  worksheet.mergeCells("A2:D5");
  worksheet.mergeCells("A1:K1");
  worksheet.mergeCells("L1:L6");
  worksheet.mergeCells("E2:H2");
  worksheet.mergeCells("E3:H3");
  worksheet.mergeCells("E4:H4");
  worksheet.mergeCells("E5:H5");
  worksheet.mergeCells("J2:K2");
  worksheet.mergeCells("J3:K3");
  worksheet.mergeCells("J4:K4");
  worksheet.mergeCells("J5:K5");
  worksheet.mergeCells("A6:K6");
  worksheet.mergeCells("C7:J7");
  worksheet.mergeCells("C8:G8");
  worksheet.mergeCells("H8:J8");

  worksheet.getCell("A1").value = "GRADUATION PROJECT - EE4357";
  worksheet.getCell("A1").style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 12,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1f497d" } },
  };
  worksheet.getCell("E2").value =
    "Faculty : Electrical and Electronic Engineering";
  worksheet.getCell("E2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E3").value =
    "Major   : Control Engineering and Automation";
  worksheet.getCell("E3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E4").value =
    "Address : 268 Ly Thuong Kiet, Ward 14, District 10, HCM City";
  worksheet.getCell("E4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J2").value = "Name   : Nguyen Minh Thai";
  worksheet.getCell("J2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J3").value = "Code   : 1910526";
  worksheet.getCell("J3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J4").value = "Tel    : 0342400518";
  worksheet.getCell("J4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J5").value = "Mentor : Nguyen Trong Tai";
  worksheet.getCell("J5").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };

  worksheet.getCell("C7").value = "MASS REPORT 2";
  worksheet.getCell("C7").style = {
    font: {
      name: "Times New Roman",
      bold: true,
      size: 16,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1488db" } },
  };
  worksheet.getCell("C8").style = {
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "132d64" } },
  };
  worksheet.getCell("H8").value =
    "Time Line: " +
    dayName +
    date +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  worksheet.getCell("H8").style = {
    font: {
      name: "Times New Roman",
      bold: false,
      italic: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "right", vertical: "bottom", wrapText: false },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "062251" } },
  };

  // Tên nhãn các cột
  var rowpos = 9;
  var collumName = [
    "",
    "",
    "STT",
    "Date",
    "Order ID",
    "Material 1 Setting",
    "Material 2 Setting",
    "Material 3 Setting",
    "Mix Time Setting",
    "Note",
  ];
  worksheet.spliceRows(rowpos, 1, collumName);

  // =====================XUẤT DỮ LIỆU SQL LÊN EXCEL  =====================
  // Dump all the data into Excel
  var rowIndex = 0;
  Mass_Excel_s2.forEach((e, index) => {
    rowIndex = index + rowpos;
    worksheet.columns = [
      { key: "" },
      { key: "" },
      { key: "STT" },
      { key: "Date" },
      { key: "Order ID" },
      { key: "Material 1 Setting" },
      { key: "Material 2 Setting" },
      { key: "Material 3 Setting" },
      { key: "Mix Time Setting" },
    ];
    worksheet.addRow({
      STT: {
        formula: index + 1,
      },
      ...e, //Kết thúc ghi dữ liệu
    });
  });
  // Lấy tổng số hàng
  const totalNumberOfRows = worksheet.rowCount;
  // Tính tổng
  worksheet.addRow([
    "",
    "",
    "Total",
    "",
    "",
    { formula: `=sum(F${rowpos + 1}:F${totalNumberOfRows})` },
    { formula: `=sum(G${rowpos + 1}:G${totalNumberOfRows})` },
    { formula: `=sum(H${rowpos + 1}:H${totalNumberOfRows})` },
    { formula: `=sum(I${rowpos + 1}:I${totalNumberOfRows})` },
  ]);

  // =====================STYLE CHO CÁC HÀNG DỮ LIỆU =====================
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    var datastartrow = rowpos;
    var rowindex = rowNumber + datastartrow;
    const rowlength = datastartrow + Mass_Excel_s2.length;
    if (rowindex >= rowlength + 1) {
      rowindex = rowlength + 1;
    }
    const insideColumns = ["C", "D", "E", "F", "G", "H", "I", "J"];
    // Tạo border
    insideColumns.forEach((v) => {
      // Border
      (worksheet.getCell(`${v}${rowindex}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      }),
        // Alignment
        (worksheet.getCell(`${v}${rowindex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        }),
        // Font
        (worksheet.getCell(`${v}${rowindex}`).font = {
          name: "Cascadia Code",
          bold: true,
          size: 12,
        });
    });
  });
  // =======================STYLE CHO HÀNG TỔNG CỘNG======================
  worksheet.getCell(`A${totalNumberOfRows + 1}`).style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center" },
  };
  // Tô màu cho hàng total (Tổng cộng)
  const total_row = ["C", "D", "E", "F", "G", "H", "I", "J"];
  total_row.forEach((v) => {
    (worksheet.getCell(`${v}${totalNumberOfRows + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "062251" },
    }),
      (worksheet.getCell(`${v}${totalNumberOfRows + 1}`).font = {
        name: "Cascadia Code",
        bold: true,
        size: 14,
        color: { argb: "ffffff" },
      });
  });

  // ====================STYLE CÁC CỘT/ HÀNG ===============================
  const HeaderStyle = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  const HeaderStyle2 = ["C", "D", "E", "F", "G", "H", "I", "J"];
  HeaderStyle.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).style = {
      font: { name: "Times New Roman", bold: true },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };
  });
  HeaderStyle2.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  // Cài đặt độ rộng cột
  worksheet.columns.forEach((column, index) => {
    column.width = 30;
  });
  // Set width column
  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 50;
  worksheet.getColumn(12).width = 30;
  // Set height row
  worksheet.getRow(7).height = 36;
  worksheet.getRow(9).height = 36;
  // =====================THẾT KẾ FOOTER=====================
  worksheet.getCell(`J${totalNumberOfRows + 2}`).value =
    "Day........Month........Year........";
  worksheet.getCell(`J${totalNumberOfRows + 2}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "right", vertical: "middle", wrapText: false },
  };

  worksheet.getCell(`C${totalNumberOfRows + 3}`).value = "Giám đốc";
  worksheet.getCell(`C${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`C${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`C${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`F${totalNumberOfRows + 3}`).value = "Trưởng ca";
  worksheet.getCell(`F${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`F${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`F${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`J${totalNumberOfRows + 3}`).value = "Người in biểu";
  worksheet.getCell(`J${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`J${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`J${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
  // Export Link
  var currentTime =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  var saveasDirect = "reports/mass_s2/Mass_s2_" + currentTime + ".xlsx";
  SaveAslink = saveasDirect; // Send to client
  var booknameLink = "src/public/" + saveasDirect;

  var Bookname = "Mass_s2" + currentTime + ".xlsx";
  // Write book name
  workbook.xlsx.writeFile(booknameLink);

  // Return
  return [SaveAslink, Bookname];
}
// =====================TRUYỀN NHẬN DỮ LIỆU VỚI TRÌNH DUYỆT=====================
function fn_Require_ExcelExport() {
  io.on("connection", function (socket) {
    socket.on("msg_Excel_Report", function (data) {
      const [SaveAslink1, Bookname] = fn_excelExport();
      var data = [SaveAslink1, Bookname];
      socket.emit("send_Excel_Report", data);
    });
    socket.on("msg_Mass_Report", function (data) {
      const [SaveAslink1, Bookname] = fn_massExport();
      var data = [SaveAslink1, Bookname];
      socket.emit("send_Mass_Report", data);
    });
  });
}
function fn_Require_ExcelExport_s2() {
  io.on("connection", function (socket) {
    socket.on("msg_Excel_Report_s2", function (data) {
      const [SaveAslink2, Bookname2] = fn_excelExport_s2();
      var data = [SaveAslink2, Bookname2];
      socket.emit("send_Excel_Report_s2", data);
    });
    socket.on("msg_Mass_Report_s2", function (data) {
      const [SaveAslink1, Bookname] = fn_massExport_s2();
      var data = [SaveAslink1, Bookname];
      socket.emit("send_Mass_Report_s2", data);
    });
  });
}
// =====================TẠO HÀM GHI ALARM XUỐNG SQL============================
function fn_sql_alarm_insert(ID, AlarmName) {
  var sqltable_Name = process.env.TABLE_ALARM_1;
  // Lấy thời gian hiện tại
  var tzoffset = new Date().getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
  var temp_datenow = new Date();
  var timeNow = new Date(temp_datenow - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");
  var timeNow_toSQL = "'" + timeNow + "',";

  // Dữ liệu trạng thái cảnh báo
  var data_1 = "'" + ID + "',";
  var data_2 = "'I',";
  var data_3 = "'" + AlarmName + "'";
  // Thêm cảnh báo vào SQL
  var str1 =
    "INSERT INTO " +
    sqltable_Name +
    " (Date, ID, Status, `Alarm Name`) VALUES (";
  var str2 = timeNow_toSQL + data_1 + data_2 + data_3;
  var str = str1 + str2 + ");";
  // Ghi dữ liệu cảnh báo vào SQL
  sqlcon.query(str, function (err, result) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

function fn_sql_alarm_insert_s2(ID, AlarmName) {
  var sqltable_Name_s2 = process.env.TABLE_ALARM_2;
  // Lấy thời gian hiện tại
  var tzoffset = new Date().getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
  var temp_datenow = new Date();
  var timeNow = new Date(temp_datenow - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");
  var timeNow_toSQL = "'" + timeNow + "',";

  // Dữ liệu trạng thái cảnh báo
  var data_1 = "'" + ID + "',";
  var data_2 = "'I',";
  var data_3 = "'" + AlarmName + "'";
  // Thêm cảnh báo vào SQL
  var str1 =
    "INSERT INTO " +
    sqltable_Name_s2 +
    " (Date, ID, Status, `Alarm Name`) VALUES (";
  var str2 = timeNow_toSQL + data_1 + data_2 + data_3;
  var str = str1 + str2 + ");";
  // Ghi dữ liệu cảnh báo vào SQL
  sqlcon_s2.query(str, function (err, result) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}
// Hàm tự động xác nhận cảnh báo
function fn_sql_alarm_ack(ID) {
  var sqltable_Name = process.env.TABLE_ALARM_1;

  // Dữ liệu trạng thái cảnh báo
  var data_1 = " Status = 'IO'";

  var str1 = "UPDATE " + sqltable_Name + " SET";
  var str2 = " WHERE ID='" + ID + "'";

  var str = str1 + data_1 + str2 + ";";
  // Ghi dữ liệu cảnh báo vào SQL
  sqlcon.query(str, function (err, result) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

function fn_sql_alarm_ack_s2(ID) {
  var sqltable_Name_s2 = process.env.TABLE_ALARM_2;

  // Dữ liệu trạng thái cảnh báo
  var data_1 = " Status = 'IO'";

  var str1 = "UPDATE " + sqltable_Name_s2 + " SET";
  var str2 = " WHERE ID='" + ID + "'";

  var str = str1 + data_1 + str2 + ";";
  // Ghi dữ liệu cảnh báo vào SQL
  sqlcon_s2.query(str, function (err, result) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}
// Hàm chức năng insert Alarm
function fn_Alarm_Manage() {
  Alarm_ID1 = arr_tag_value[45];
  Alarm_ID2 = arr_tag_value[46];
  Alarm_ID3 = arr_tag_value[47];
  Alarm_ID4 = arr_tag_value[48];
  Alarm_ID5 = arr_tag_value[49];
  // Cảnh báo van 1
  if (Alarm_ID1 && !Alarm_ID1_old) {
    fn_sql_alarm_insert(1, "Valve 1 Error");
  }
  if ((Alarm_ID1 == false) & (Alarm_ID1 != Alarm_ID1_old)) {
    fn_sql_alarm_ack(1);
  }
  Alarm_ID1_old = Alarm_ID1;
  // Cảnh báo van 2
  if (Alarm_ID2 && !Alarm_ID2_old) {
    fn_sql_alarm_insert(2, "Valve 2 Error");
  }
  if ((Alarm_ID2 == false) & (Alarm_ID2 != Alarm_ID2_old)) {
    fn_sql_alarm_ack(2);
  }
  Alarm_ID2_old = Alarm_ID2;
  // Cảnh báo van 3
  if (Alarm_ID3 && !Alarm_ID3_old) {
    fn_sql_alarm_insert(3, "Valve 3 Error");
  }
  if ((Alarm_ID3 == false) & (Alarm_ID3 != Alarm_ID3_old)) {
    fn_sql_alarm_ack(3);
  }
  Alarm_ID3_old = Alarm_ID3;
  // Cảnh báo Động cơ trộn
  if (Alarm_ID4 && !Alarm_ID4_old) {
    fn_sql_alarm_insert(4, "Mix DC Error");
  }
  if ((Alarm_ID4 == false) & (Alarm_ID4 != Alarm_ID4_old)) {
    fn_sql_alarm_ack(4);
  }
  Alarm_ID4_old = Alarm_ID4;
  // Cảnh báo máy xuất hàng
  if (Alarm_ID5 && !Alarm_ID5_old) {
    fn_sql_alarm_insert(5, "Export Error");
  }
  if ((Alarm_ID5 == false) & (Alarm_ID5 != Alarm_ID5_old)) {
    fn_sql_alarm_ack(5);
  }
  Alarm_ID5_old = Alarm_ID5;
}

function fn_Alarm_Manage_s2() {
  Alarm_ID1_s2 = arr_tag_value_s2[45];
  Alarm_ID2_s2 = arr_tag_value_s2[46];
  Alarm_ID3_s2 = arr_tag_value_s2[47];
  Alarm_ID4_s2 = arr_tag_value_s2[48];
  Alarm_ID5_s2 = arr_tag_value_s2[49];
  // Cảnh báo van 1
  if (Alarm_ID1_s2 && !Alarm_ID1_old_s2) {
    fn_sql_alarm_insert_s2(1, "Valve 1 Error");
  }
  if ((Alarm_ID1_s2 == false) & (Alarm_ID1_s2 != Alarm_ID1_old_s2)) {
    fn_sql_alarm_ack_s2(1);
  }
  Alarm_ID1_old_s2 = Alarm_ID1_s2;
  // Cảnh báo van 2
  if (Alarm_ID2_s2 && !Alarm_ID2_old_s2) {
    fn_sql_alarm_insert_s2(2, "Valve 2 Error");
  }
  if ((Alarm_ID2_s2 == false) & (Alarm_ID2_s2 != Alarm_ID2_old_s2)) {
    fn_sql_alarm_ack_s2(2);
  }
  Alarm_ID2_old_s2 = Alarm_ID2_s2;
  // Cảnh báo van 3
  if (Alarm_ID3_s2 && !Alarm_ID3_old_s2) {
    fn_sql_alarm_insert_s2(3, "Valve 3 Error");
  }
  if ((Alarm_ID3_s2 == false) & (Alarm_ID3_s2 != Alarm_ID3_old_s2)) {
    fn_sql_alarm_ack_s2(3);
  }
  Alarm_ID3_old_s2 = Alarm_ID3_s2;
  // Cảnh báo Động cơ trộn
  if (Alarm_ID4_s2 && !Alarm_ID4_old_s2) {
    fn_sql_alarm_insert_s2(4, "Mix DC Error");
  }
  if ((Alarm_ID4_s2 == false) & (Alarm_ID4_s2 != Alarm_ID4_old_s2)) {
    fn_sql_alarm_ack_s2(4);
  }
  Alarm_ID4_old_s2 = Alarm_ID4_s2;
  // Cảnh báo máy xuất hàng
  if (Alarm_ID5_s2 && !Alarm_ID5_old_s2) {
    fn_sql_alarm_insert_s2(5, "Export Error");
  }
  if ((Alarm_ID5_s2 == false) & (Alarm_ID5_s2 != Alarm_ID5_old_s2)) {
    fn_sql_alarm_ack_s2(5);
  }
  Alarm_ID5_old_s2 = Alarm_ID5_s2;
}
// ////////////////////////ĐỌC DỮ LIỆU ALARM GHI VÔ BẢNG////////////////////////
function fn_AlarmSearch() {
  io.on("connection", function (socket) {
    socket.on("msg_Alarm_Show", function (data) {
      var sqltable_Name = process.env.TABLE_ALARM_1;
      var query = "SELECT * FROM " + sqltable_Name + " WHERE Status = 'I';";
      sqlcon.query(query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          socket.emit("Alarm_Show", convertedResponse);
        }
      });
    });
  });
}
function fn_AlarmSearch_s2() {
  io.on("connection", function (socket) {
    socket.on("msg_Alarm_Show_s2", function (data) {
      var sqltable_Name_s2 = process.env.TABLE_ALARM_2;
      var query = "SELECT * FROM " + sqltable_Name_s2 + " WHERE Status = 'I';";
      sqlcon_s2.query(query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          socket.emit("Alarm_Show_s2", convertedResponse);
        }
      });
    });
  });
}

// //////////////////////TÌM KIẾM DỮ LIỆU THEO THỜI GIAN///////////////////////
function fn_Alarm_Search_ByTime() {
  io.on("connection", function (socket) {
    socket.on("msg_Alarm_ByTime", function (data) {
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
      // Lấy thời gian tìm kiếm từ date time piker
      var timeS = new Date(data[0]); // Thời gian bắt đầu
      var timeE = new Date(data[1]); // Thời gian kết thúc
      // Quy đổi thời gian ra định dạng cua MySQL
      var timeS1 =
        "'" +
        new Date(timeS - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeE1 =
        "'" +
        new Date(timeE - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

      var sqltable_Name = process.env.TABLE_ALARM_1; // Tên bảng
      var dt_col_Name = "Date"; // Tên cột thời gian

      var Query1 =
        "SELECT * FROM " +
        sqltable_Name +
        " WHERE " +
        dt_col_Name +
        " BETWEEN ";
      var Query = Query1 + timeR + ";";

      sqlcon.query(Query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          AL_Excel = convertedResponse;
          socket.emit("Alarm_ByTime", convertedResponse);
        }
      });
    });
  });
}
function fn_Alarm_Search_ByTime_s2() {
  io.on("connection", function (socket) {
    socket.on("msg_Alarm_ByTime_s2", function (data) {
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
      // Lấy thời gian tìm kiếm từ date time piker
      var timeS = new Date(data[0]); // Thời gian bắt đầu
      var timeE = new Date(data[1]); // Thời gian kết thúc
      // Quy đổi thời gian ra định dạng cua MySQL
      var timeS1 =
        "'" +
        new Date(timeS - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeE1 =
        "'" +
        new Date(timeE - tzoffset)
          .toISOString()
          .slice(0, -1)
          .replace("T", " ") +
        "'";
      var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

      var sqltable_Name_s2 = process.env.TABLE_ALARM_2; // Tên bảng
      var dt_col_Name = "Date"; // Tên cột thời gian

      var Query1 =
        "SELECT * FROM " +
        sqltable_Name_s2 +
        " WHERE " +
        dt_col_Name +
        " BETWEEN ";
      var Query = Query1 + timeR + ";";

      sqlcon_s2.query(Query, function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          const objectifyRawPacket = (row) => ({ ...row });
          const convertedResponse = results.map(objectifyRawPacket);
          AL_Excel_s2 = convertedResponse;
          socket.emit("Alarm_ByTime_s2", convertedResponse);
        }
      });
    });
  });
}
// //////////////////////////XUẤT EXCEL ALARM//////////////////////
function fn_AL_excelExport() {
  // =====================CÁC THUỘC TÍNH CHUNG=====================
  // Lấy ngày tháng hiện tại
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let day = date_ob.getDay();
  var dayName = "";
  if (day == 0) {
    dayName = "Sunday,";
  } else if (day == 1) {
    dayName = "Monday,";
  } else if (day == 2) {
    dayName = "Tuesday,";
  } else if (day == 3) {
    dayName = "Wednesday,";
  } else if (day == 4) {
    dayName = "Thursday,";
  } else if (day == 5) {
    dayName = "Friday,";
  } else if (day == 6) {
    dayName = "Saturday,";
  } else {
  }
  // Tạo và khai báo Excel
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Alarm Report", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { tabColor: { argb: "FFC0000" } },
  });
  // Page setup (cài đặt trang)
  worksheet.properties.defaultRowHeight = 20;
  worksheet.pageSetup.margins = {
    left: 0.3,
    right: 0.25,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3,
  };
  // =====================THẾT KẾ HEADER=====================
  const imageId1 = workbook.addImage({
    filename: "src/public/images/Logo/bk_name_en.png",
    extension: "png",
  });
  worksheet.addImage(imageId1, "A2:D5");
  const imageId2 = workbook.addImage({
    filename: "src/public/images/Logo/OIP.jpg",
    extension: "jpg",
  });
  worksheet.addImage(imageId2, "L1:L6");

  worksheet.mergeCells("A2:D5");
  worksheet.mergeCells("A1:K1");
  worksheet.mergeCells("L1:L6");
  worksheet.mergeCells("E2:H2");
  worksheet.mergeCells("E3:H3");
  worksheet.mergeCells("E4:H4");
  worksheet.mergeCells("E5:H5");
  worksheet.mergeCells("J2:K2");
  worksheet.mergeCells("J3:K3");
  worksheet.mergeCells("J4:K4");
  worksheet.mergeCells("J5:K5");
  worksheet.mergeCells("A6:K6");
  worksheet.mergeCells("C7:H7");
  worksheet.mergeCells("C8:F8");
  worksheet.mergeCells("G8:H8");

  worksheet.getCell("A1").value = "GRADUATION PROJECT - EE4357";
  worksheet.getCell("A1").style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 12,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1f497d" } },
  };
  worksheet.getCell("E2").value =
    "Faculty : Electrical and Electronic Engineering";
  worksheet.getCell("E2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E3").value =
    "Major   : Control Engineering and Automation";
  worksheet.getCell("E3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E4").value =
    "Address : 268 Ly Thuong Kiet, Ward 14, District 10, HCM City";
  worksheet.getCell("E4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J2").value = "Name   : Nguyen Minh Thai";
  worksheet.getCell("J2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J3").value = "Code   : 1910526";
  worksheet.getCell("J3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J4").value = "Tel    : 0342400518";
  worksheet.getCell("J4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J5").value = "Mentor : Nguyen Trong Tai";
  worksheet.getCell("J5").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };

  worksheet.getCell("C7").value = "ALARM REPORT 1";
  worksheet.getCell("C7").style = {
    font: {
      name: "Times New Roman",
      bold: true,
      size: 16,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1488db" } },
  };
  worksheet.getCell("C8").style = {
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "132d64" } },
  };
  worksheet.getCell("G8").value =
    "Time Line: " +
    dayName +
    date +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  worksheet.getCell("G8").style = {
    font: {
      name: "Times New Roman",
      bold: false,
      italic: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "right", vertical: "bottom", wrapText: false },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "062251" } },
  };

  // Tên nhãn các cột
  var rowpos = 9;
  var collumName = [
    "",
    "",
    "STT",
    "Date",
    "ID",
    "Status",
    "Alarm Name",
    "Note",
  ];
  worksheet.spliceRows(rowpos, 1, collumName);

  // =====================XUẤT DỮ LIỆU SQL LÊN EXCEL  =====================
  // Dump all the data into Excel
  var rowIndex = 0;
  AL_Excel.forEach((e, index) => {
    rowIndex = index + rowpos;
    worksheet.columns = [
      { key: "" },
      { key: "" },
      { key: "STT" },
      { key: "Date" },
      { key: "ID" },
      { key: "Status" },
      { key: "Alarm Name" },
    ];
    worksheet.addRow({
      STT: {
        formula: index + 1,
      },
      ...e, //Kết thúc ghi dữ liệu
    });
  });
  // Lấy tổng số hàng
  const totalNumberOfRows = worksheet.rowCount;
  const total_row = ["C", "D", "E", "F", "G", "H"];
  total_row.forEach((v) => {
    worksheet.getCell(`${v}${totalNumberOfRows + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "062251" },
    };
  });
  // =====================STYLE CHO CÁC HÀNG DỮ LIỆU =====================
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    var datastartrow = rowpos;
    var rowindex = rowNumber + datastartrow;
    const rowlength = datastartrow + AL_Excel.length;
    if (rowindex >= rowlength + 1) {
      rowindex = rowlength + 1;
    }
    const insideColumns = ["C", "D", "E", "F", "G", "H"];
    // Tạo border
    insideColumns.forEach((v) => {
      // Border
      (worksheet.getCell(`${v}${rowindex}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      }),
        // Alignment
        (worksheet.getCell(`${v}${rowindex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        }),
        // Font
        (worksheet.getCell(`${v}${rowindex}`).font = {
          name: "Cascadia Code",
          bold: true,
          size: 12,
        });
    });
  });
  // ====================STYLE CÁC CỘT/ HÀNG ===============================
  const HeaderStyle = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  const HeaderStyle2 = ["C", "D", "E", "F", "G", "H"];
  HeaderStyle.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).style = {
      font: { name: "Times New Roman", bold: true },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };
  });
  HeaderStyle2.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  // Cài đặt độ rộng cột
  worksheet.columns.forEach((column, index) => {
    column.width = 30;
  });
  // Set width column
  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 50;
  // Set height row
  worksheet.getRow(7).height = 36;
  worksheet.getRow(9).height = 36;
  // =====================THẾT KẾ FOOTER=====================
  worksheet.getCell(`H${totalNumberOfRows + 2}`).value =
    "Day........Month........Year........";
  worksheet.getCell(`H${totalNumberOfRows + 2}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "right", vertical: "middle", wrapText: false },
  };

  worksheet.getCell(`C${totalNumberOfRows + 3}`).value = "Giám đốc";
  worksheet.getCell(`C${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`C${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`C${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`E${totalNumberOfRows + 3}`).value = "Trưởng ca";
  worksheet.getCell(`E${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`E${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`E${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`H${totalNumberOfRows + 3}`).value = "Người in biểu";
  worksheet.getCell(`H${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`H${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`H${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
  // Export Link
  var currentTimeAL =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  var saveasDirectAL = "reports/alarm/Alarm_Report_" + currentTimeAL + ".xlsx";
  SaveAslinkAL = saveasDirectAL; // Send to client
  var booknameLinkAL = "src/public/" + saveasDirectAL;

  var BooknameAL = "Alarm_Report_" + currentTimeAL + ".xlsx";
  // Write book name
  workbook.xlsx.writeFile(booknameLinkAL);

  // Return
  return [SaveAslinkAL, BooknameAL];
}
function fn_AL_excelExport_s2() {
  // =====================CÁC THUỘC TÍNH CHUNG=====================
  // Lấy ngày tháng hiện tại
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let day = date_ob.getDay();
  var dayName = "";
  if (day == 0) {
    dayName = "Sunday,";
  } else if (day == 1) {
    dayName = "Monday,";
  } else if (day == 2) {
    dayName = "Tuesday,";
  } else if (day == 3) {
    dayName = "Wednesday,";
  } else if (day == 4) {
    dayName = "Thursday,";
  } else if (day == 5) {
    dayName = "Friday,";
  } else if (day == 6) {
    dayName = "Saturday,";
  } else {
  }
  // Tạo và khai báo Excel
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Alarm Report 2", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { tabColor: { argb: "FFC0000" } },
  });
  // Page setup (cài đặt trang)
  worksheet.properties.defaultRowHeight = 20;
  worksheet.pageSetup.margins = {
    left: 0.3,
    right: 0.25,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3,
  };
  // =====================THẾT KẾ HEADER=====================
  const imageId1 = workbook.addImage({
    filename: "src/public/images/Logo/bk_name_en.png",
    extension: "png",
  });
  worksheet.addImage(imageId1, "A2:D5");
  const imageId2 = workbook.addImage({
    filename: "src/public/images/Logo/OIP.jpg",
    extension: "jpg",
  });
  worksheet.addImage(imageId2, "L1:L6");

  worksheet.mergeCells("A2:D5");
  worksheet.mergeCells("A1:K1");
  worksheet.mergeCells("L1:L6");
  worksheet.mergeCells("E2:H2");
  worksheet.mergeCells("E3:H3");
  worksheet.mergeCells("E4:H4");
  worksheet.mergeCells("E5:H5");
  worksheet.mergeCells("J2:K2");
  worksheet.mergeCells("J3:K3");
  worksheet.mergeCells("J4:K4");
  worksheet.mergeCells("J5:K5");
  worksheet.mergeCells("A6:K6");
  worksheet.mergeCells("C7:H7");
  worksheet.mergeCells("C8:F8");
  worksheet.mergeCells("G8:H8");

  worksheet.getCell("A1").value = "GRADUATION PROJECT - EE4357";
  worksheet.getCell("A1").style = {
    font: {
      name: "Cascadia Code",
      bold: true,
      size: 12,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1f497d" } },
  };
  worksheet.getCell("E2").value =
    "Faculty : Electrical and Electronic Engineering";
  worksheet.getCell("E2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E3").value =
    "Major   : Control Engineering and Automation";
  worksheet.getCell("E3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("E4").value =
    "Address : 268 Ly Thuong Kiet, Ward 14, District 10, HCM City";
  worksheet.getCell("E4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J2").value = "Name   : Nguyen Minh Thai";
  worksheet.getCell("J2").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J3").value = "Code   : 1910526";
  worksheet.getCell("J3").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J4").value = "Tel    : 0342400518";
  worksheet.getCell("J4").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };
  worksheet.getCell("J5").value = "Mentor : Nguyen Trong Tai";
  worksheet.getCell("J5").style = {
    font: { name: "Cascadia Code", bold: true, size: 12 },
    alignment: { horizontal: "left", vertical: "middle" },
  };

  worksheet.getCell("C7").value = "ALARM REPORT 2";
  worksheet.getCell("C7").style = {
    font: {
      name: "Times New Roman",
      bold: true,
      size: 16,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "1488db" } },
  };
  worksheet.getCell("C8").style = {
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "132d64" } },
  };
  worksheet.getCell("G8").value =
    "Time Line: " +
    dayName +
    date +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  worksheet.getCell("G8").style = {
    font: {
      name: "Times New Roman",
      bold: false,
      italic: true,
      size: 14,
      color: { argb: "ffffff" },
    },
    alignment: { horizontal: "right", vertical: "bottom", wrapText: false },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "062251" } },
  };

  // Tên nhãn các cột
  var rowpos = 9;
  var collumName = [
    "",
    "",
    "STT",
    "Date",
    "ID",
    "Status",
    "Alarm Name",
    "Note",
  ];
  worksheet.spliceRows(rowpos, 1, collumName);

  // =====================XUẤT DỮ LIỆU SQL LÊN EXCEL  =====================
  // Dump all the data into Excel
  var rowIndex = 0;
  AL_Excel_s2.forEach((e, index) => {
    rowIndex = index + rowpos;
    worksheet.columns = [
      { key: "" },
      { key: "" },
      { key: "STT" },
      { key: "Date" },
      { key: "ID" },
      { key: "Status" },
      { key: "Alarm Name" },
    ];
    worksheet.addRow({
      STT: {
        formula: index + 1,
      },
      ...e, //Kết thúc ghi dữ liệu
    });
  });
  // Lấy tổng số hàng
  const totalNumberOfRows = worksheet.rowCount;
  const total_row = ["C", "D", "E", "F", "G", "H"];
  total_row.forEach((v) => {
    worksheet.getCell(`${v}${totalNumberOfRows + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "062251" },
    };
  });
  // =====================STYLE CHO CÁC HÀNG DỮ LIỆU =====================
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    var datastartrow = rowpos;
    var rowindex = rowNumber + datastartrow;
    const rowlength = datastartrow + AL_Excel_s2.length;
    if (rowindex >= rowlength + 1) {
      rowindex = rowlength + 1;
    }
    const insideColumns = ["C", "D", "E", "F", "G", "H"];
    // Tạo border
    insideColumns.forEach((v) => {
      // Border
      (worksheet.getCell(`${v}${rowindex}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      }),
        // Alignment
        (worksheet.getCell(`${v}${rowindex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        }),
        // Font
        (worksheet.getCell(`${v}${rowindex}`).font = {
          name: "Cascadia Code",
          bold: true,
          size: 12,
        });
    });
  });
  // ====================STYLE CÁC CỘT/ HÀNG ===============================
  const HeaderStyle = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  const HeaderStyle2 = ["C", "D", "E", "F", "G", "H"];
  HeaderStyle.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).style = {
      font: { name: "Times New Roman", bold: true },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };
  });
  HeaderStyle2.forEach((v) => {
    worksheet.getCell(`${v}${rowpos}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  // Cài đặt độ rộng cột
  worksheet.columns.forEach((column, index) => {
    column.width = 30;
  });
  // Set width column
  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 50;
  // Set height row
  worksheet.getRow(7).height = 36;
  worksheet.getRow(9).height = 36;
  // =====================THẾT KẾ FOOTER=====================
  worksheet.getCell(`H${totalNumberOfRows + 2}`).value =
    "Day........Month........Year........";
  worksheet.getCell(`H${totalNumberOfRows + 2}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "right", vertical: "middle", wrapText: false },
  };

  worksheet.getCell(`C${totalNumberOfRows + 3}`).value = "Giám đốc";
  worksheet.getCell(`C${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`C${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`C${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`E${totalNumberOfRows + 3}`).value = "Trưởng ca";
  worksheet.getCell(`E${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`E${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`E${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  worksheet.getCell(`H${totalNumberOfRows + 3}`).value = "Người in biểu";
  worksheet.getCell(`H${totalNumberOfRows + 4}`).value = "(Ký, ghi rõ họ tên)";
  worksheet.getCell(`H${totalNumberOfRows + 3}`).style = {
    font: { name: "Cascadia Code", bold: true, italic: false },
    alignment: { horizontal: "center", vertical: "bottom", wrapText: false },
  };
  worksheet.getCell(`H${totalNumberOfRows + 4}`).style = {
    font: { name: "Cascadia Code", bold: false, italic: true },
    alignment: { horizontal: "center", vertical: "top", wrapText: false },
  };

  // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
  // Export Link
  var currentTimeAL =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  var saveasDirectAL =
    "reports/alarm_s2/Alarm_Report_s2_" + currentTimeAL + ".xlsx";
  SaveAslinkAL = saveasDirectAL; // Send to client
  var booknameLinkAL = "src/public/" + saveasDirectAL;

  var BooknameAL = "Alarm_Report_s2_" + currentTimeAL + ".xlsx";
  // Write book name
  workbook.xlsx.writeFile(booknameLinkAL);

  // Return
  return [SaveAslinkAL, BooknameAL];
}
// =====================TRUYỀN NHẬN DỮ LIỆU VỚI TRÌNH DUYỆT=====================
function fn_AL_Require_ExcelExport() {
  io.on("connection", function (socket) {
    socket.on("msg_Excel_Report_al", function (data) {
      const [SaveAslink1, Bookname] = fn_AL_excelExport();
      var data = [SaveAslink1, Bookname];
      socket.emit("send_Excel_Report_al", data);
    });
  });
}
function fn_AL_Require_ExcelExport_s2() {
  io.on("connection", function (socket) {
    socket.on("msg_Excel_Report_al_s2", function (data) {
      const [SaveAslink2, Bookname] = fn_AL_excelExport_s2();
      var data = [SaveAslink2, Bookname];
      socket.emit("send_Excel_Report_al_s2", data);
    });
  });
}
