function fn_excel() {
  var linktext = "";
  var bookname = "";
  socket.emit("msg_Excel_Report", true);
  socket.on("send_Excel_Report", function (data) {
    linktext = data[0];
    bookname = data[1];
    setTimeout(() => {
      saveAs(linktext, bookname);
    }, 1000);
  });
}
function fn_excel_s2() {
  var linktext = "";
  var bookname = "";
  socket.emit("msg_Excel_Report_s2", true);
  socket.on("send_Excel_Report_s2", function (data) {
    linktext = data[0];
    bookname = data[1];
    setTimeout(() => {
      saveAs(linktext, bookname);
    }, 1000);
  });
}
function fn_excel_al() {
  var linktext = "";
  var bookname = "";
  socket.emit("msg_Excel_Report_al", true);
  socket.on("send_Excel_Report_al", function (data) {
    linktext = data[0];
    bookname = data[1];
    setTimeout(() => {
      saveAs(linktext, bookname);
    }, 1000);
  });
}
function fn_excel_al_s2() {
  var linktext = "";
  var bookname = "";
  socket.emit("msg_Excel_Report_al_s2", true);
  socket.on("send_Excel_Report_al_s2", function (data) {
    linktext = data[0];
    bookname = data[1];
    // Delay save as
    setTimeout(() => {
      saveAs(linktext, bookname);
    }, 1000);
  });
}

function fn_excel_mass() {
  var linktext = "";
  var bookname = "";
  socket.emit("msg_Mass_Report", true);
  socket.on("send_Mass_Report", function (data) {
    linktext = data[0];
    bookname = data[1];
    setTimeout(() => {
      saveAs(linktext, bookname);
    }, 1000);
  });
}

function fn_excel_mass_s2() {
  var linktext = "";
  var bookname = "";
  socket.emit("msg_Mass_Report_s2", true);
  socket.on("send_Mass_Report_s2", function (data) {
    linktext = data[0];
    bookname = data[1];
    setTimeout(() => {
      saveAs(linktext, bookname);
    }, 1000);
  });
}