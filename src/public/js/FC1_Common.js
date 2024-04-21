// //////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
  socket.emit("Client-send-data", "Request data client");
}
// //////////// CÁC KHỐI CHƯƠNG TRÌNH CON ///////////////////////////
// Chương trình con đọc dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix) {
  socket.on(tag, function (data) {
    if (tofix == 0) {
      document.getElementById(IOField).value = data;
    } else {
      document.getElementById(IOField).value = data.toFixed(tofix);
    }
  });
}
// Chương trình con đổi màu Symbol
function fn_SymbolStatus(ObjectID, SymName, Tag) {
  var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
  var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
  var imglink_2 = "images/Symbol/" + SymName + "_2.png"; // Trạng thái tag = 2
  socket.on(Tag, function (data) {
    if (data == 0) {
      document.getElementById(ObjectID).src = imglink_0;
    } else if (data == 1) {
      document.getElementById(ObjectID).src = imglink_1;
    } else if (data == 2) {
      document.getElementById(ObjectID).src = imglink_2;
    } else {
      document.getElementById(ObjectID).src = imglink_0;
    }
  });
}

// Chương trình con chuyển trang
function fn_ScreenChange1(scr_x, scr_y) {
  document.getElementById(scr_x).style.visibility = "visible"; // Hiển thị trang được chọn
  document.getElementById(scr_y).style.visibility = "hidden"; // Ẩn trang 1
}
function fn_ScreenChange2(scr_x, scr_y) {
  document.getElementById(scr_x).style.visibility = "hidden"; // Hiển thị trang được chọn
  document.getElementById(scr_y).style.visibility = "hidden"; // Ẩn trang 1
}
function fn_ScreenChange3(scr_1, scr_2, scr_3) {
  document.getElementById(scr_1).style.visibility = "visible"; // Hiển thị trang được chọn
  document.getElementById(scr_2).style.visibility = "hidden"; // Hiển thị trang được chọn
  document.getElementById(scr_3).style.visibility = "hidden"; // Ẩn trang 1
}
function fn_ScreenHidden(scr_1, scr_2, scr_3, scr_4, scr_5, scr_6) {
  document.getElementById(scr_1).style.visibility = "hidden"; // Hiển thị trang được chọn
  document.getElementById(scr_2).style.visibility = "hidden"; // Hiển thị trang được chọn
  document.getElementById(scr_3).style.visibility = "hidden"; // Ẩn trang 1
  document.getElementById(scr_4).style.visibility = "hidden"; // Hiển thị trang được chọn
  document.getElementById(scr_5).style.visibility = "hidden"; // Hiển thị trang được chọn
  document.getElementById(scr_6).style.visibility = "hidden"; // Ẩn trang 1
}
function fn_ScreenChangeMain(
  scr_1,
  scr_2,
  scr_3,
  scr_4,
  scr_5,
  scr_6,
  scr_7,
  scr_8,
  scr_9,
  scr_10,
  scr_11,
  scr_12,
  scr_13
) {
  document.getElementById(scr_1).style.visibility = "visible"; // Hiển thị trang được chọn
  document.getElementById(scr_2).style.visibility = "hidden"; // Ẩn trang 2
  document.getElementById(scr_3).style.visibility = "hidden"; // Ẩn trang 3
  document.getElementById(scr_4).style.visibility = "hidden"; // Ẩn trang 4
  document.getElementById(scr_5).style.visibility = "hidden"; // Ẩn trang 5
  document.getElementById(scr_6).style.visibility = "hidden";
  document.getElementById(scr_7).style.visibility = "hidden";
  document.getElementById(scr_8).style.visibility = "hidden";
  document.getElementById(scr_9).style.visibility = "hidden";
  document.getElementById(scr_10).style.visibility = "hidden";
  document.getElementById(scr_11).style.visibility = "hidden";
  document.getElementById(scr_12).style.visibility = "hidden";
  document.getElementById(scr_13).style.visibility = "hidden";
}
function fn_ScreenChangeSub(
  scr_1,
  scr_2,
  scr_3,
  scr_4,
  scr_5,
  scr_6,
  scr_7,
  scr_8,
  scr_9
) {
  document.getElementById(scr_1).style.visibility = "visible"; // Hiển thị trang được chọn
  document.getElementById(scr_2).style.visibility = "hidden"; // Ẩn trang 2
  document.getElementById(scr_3).style.visibility = "hidden"; // Ẩn trang 3
  document.getElementById(scr_4).style.visibility = "hidden"; // Ẩn trang 4
  document.getElementById(scr_5).style.visibility = "hidden"; // Ẩn trang 5
  document.getElementById(scr_6).style.visibility = "hidden";
  document.getElementById(scr_7).style.visibility = "hidden";
  document.getElementById(scr_8).style.visibility = "hidden";
  document.getElementById(scr_9).style.visibility = "hidden";
}
// Chương trình con nút sửa/lưu dữ liệu
function fn_DataEdit(button1, button2) {
  document.getElementById(button1).style.zIndex = "1"; // Hiển nút 1
  document.getElementById(button2).style.zIndex = "0"; // Ẩn nút 2
}

// //////////////// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA ///////////////////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var Auto_Scr_data_edditting = false;
var Auto_Scr_data_edditting_s2 = false;
var Manu_Scr_data_edditting = false;
var Manu_Scr_data_edditting_s2 = false;
function fn_scrAuto_EditBtt() {
  // Cho hiển thị nút nhấn lưu
  fn_DataEdit("btt_scrAuto_Save", "btt_scrAuto_Edit");
  // Cho tag báo đang sửa dữ liệu lên giá trị true
  Auto_Scr_data_edditting = true;
  // Kích hoạt chức năng sửa của các IO Field
  document.getElementById("set_orderID").disabled = false; //
  document.getElementById("set_Weight1").disabled = false; //
  document.getElementById("set_Weight2").disabled = false; //
  document.getElementById("set_Weight3").disabled = false; //
  document.getElementById("set_Time").disabled = false; //
}
function fn_scrAuto_EditBtt_s2() {
  // Cho hiển thị nút nhấn lưu
  fn_DataEdit("btt_scrAuto_Save_s2", "btt_scrAuto_Edit_s2");
  // Cho tag báo đang sửa dữ liệu lên giá trị true
  Auto_Scr_data_edditting_s2 = true;
  // Kích hoạt chức năng sửa của các IO Field
  document.getElementById("set_orderID_s2").disabled = false; //
  document.getElementById("set_Weight1_s2").disabled = false; //
  document.getElementById("set_Weight2_s2").disabled = false; //
  document.getElementById("set_Weight3_s2").disabled = false; //
  document.getElementById("set_Time_s2").disabled = false; //
}
function fn_scrManu_EditBtt() {
  fn_DataEdit("btt_scrManu_Save", "btt_scrManu_Edit");
  Manu_Scr_data_edditting = true;
  document.getElementById("set_orderID_Manu").disabled = false;
}
function fn_scrManu_EditBtt_s2() {
  fn_DataEdit("btt_scrManu_Save_s2", "btt_scrManu_Edit_s2");
  Manu_Scr_data_edditting_s2 = true;
  document.getElementById("set_orderID_Manu_s2").disabled = false;
}
// /////////// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU ///////////////////
function fn_scrAuto_SaveBtt() {
  // Cho hiển thị nút nhấn sửa
  fn_DataEdit("btt_scrAuto_Edit", "btt_scrAuto_Save");
  // Cho tag đang sửa dữ liệu về 0
  Auto_Scr_data_edditting = false;
  // Gửi dữ liệu cần sửa xuống PLC
  var data_edit_array = [
    document.getElementById("set_orderID").value,
    document.getElementById("set_Weight1").value,
    document.getElementById("set_Weight2").value,
    document.getElementById("set_Weight3").value,
    document.getElementById("set_Time").value,
  ];
  socket.emit("cmd_Edit_Data", data_edit_array);
  alert("Data is saved!");
  // Vô hiệu hoá chức năng sửa của các IO Field
  document.getElementById("set_orderID").disabled = true;
  document.getElementById("set_Weight1").disabled = true;
  document.getElementById("set_Weight2").disabled = true;
  document.getElementById("set_Weight3").disabled = true;
  document.getElementById("set_Time").disabled = true; //
}
function fn_scrAuto_SaveBtt_s2() {
  // Cho hiển thị nút nhấn sửa
  fn_DataEdit("btt_scrAuto_Edit_s2", "btt_scrAuto_Save_s2");
  // Cho tag đang sửa dữ liệu về 0
  Auto_Scr_data_edditting_s2 = false;
  // Gửi dữ liệu cần sửa xuống PLC
  var data_edit_array = [
    document.getElementById("set_orderID_s2").value,
    document.getElementById("set_Weight1_s2").value,
    document.getElementById("set_Weight2_s2").value,
    document.getElementById("set_Weight3_s2").value,
    document.getElementById("set_Time_s2").value,
  ];
  socket.emit("cmd_Edit_Data_s2", data_edit_array);
  alert("Data is saved!");
  // Vô hiệu hoá chức năng sửa của các IO Field
  document.getElementById("set_orderID_s2").disabled = true;
  document.getElementById("set_Weight1_s2").disabled = true;
  document.getElementById("set_Weight2_s2").disabled = true;
  document.getElementById("set_Weight3_s2").disabled = true;
  document.getElementById("set_Time_s2").disabled = true; //
}
function fn_scrManu_SaveBtt() {
  // Cho hiển thị nút nhấn sửa
  fn_DataEdit("btt_scrManu_Edit", "btt_scrManu_Save");
  // Cho tag đang sửa dữ liệu về 0
  Manu_Scr_data_edditting = false;
  // Gửi dữ liệu cần sửa xuống PLC
  var data_edit_array = [document.getElementById("set_orderID_Manu").value];
  socket.emit("cmd_Edit_Data_Manu", data_edit_array);
  alert("Data is saved!");
  // Vô hiệu hoá chức năng sửa của các IO Field
  document.getElementById("set_orderID_Manu").disabled = true;
}
function fn_scrManu_SaveBtt_s2() {
  // Cho hiển thị nút nhấn sửa
  fn_DataEdit("btt_scrManu_Edit_s2", "btt_scrManu_Save_s2");
  // Cho tag đang sửa dữ liệu về 0
  Manu_Scr_data_edditting_s2 = false;
  // Gửi dữ liệu cần sửa xuống PLC
  var data_edit_array = [document.getElementById("set_orderID_Manu_s2").value];
  socket.emit("cmd_Edit_Data_Manu_s2", data_edit_array);
  alert("Data is saved!");
  // Vô hiệu hoá chức năng sửa của các IO Field
  document.getElementById("set_orderID_Manu_s2").disabled = true;
}
// Chương trình con đọc dữ liệu lên IO Field
function fn_scrAuto_IOField_IO(tag, IOField, tofix) {
  socket.on(tag, function (data) {
    if ((tofix == 0) & (Auto_Scr_data_edditting != true)) {
      document.getElementById(IOField).value = data;
    } else if (Auto_Scr_data_edditting != true) {
      document.getElementById(IOField).value = data.toFixed(tofix);
    }
  });
}
function fn_scrAuto_IOField_IO_s2(tag, IOField, tofix) {
  socket.on(tag, function (data) {
    if ((tofix == 0) & (Auto_Scr_data_edditting_s2 != true)) {
      document.getElementById(IOField).value = data;
    } else if (Auto_Scr_data_edditting_s2 != true) {
      document.getElementById(IOField).value = data.toFixed(tofix);
    }
  });
}
function fn_scrManu_IOField_IO(tag, IOField, tofix) {
  socket.on(tag, function (data) {
    if ((tofix == 0) & (Manu_Scr_data_edditting != true)) {
      document.getElementById(IOField).value = data;
    } else if (Manu_Scr_data_edditting != true) {
      document.getElementById(IOField).value = data.toFixed(tofix);
    }
  });
}
function fn_scrManu_IOField_IO_s2(tag, IOField, tofix) {
  socket.on(tag, function (data) {
    if ((tofix == 0) & (Manu_Scr_data_edditting_s2 != true)) {
      document.getElementById(IOField).value = data;
    } else if (Manu_Scr_data_edditting != true) {
      document.getElementById(IOField).value = data.toFixed(tofix);
    }
  });
}
