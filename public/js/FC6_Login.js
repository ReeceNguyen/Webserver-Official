// Chương trình con
var users = [
  { name: "admin", password: "123" },
  { name: "user1", password: "1" },
  { name: "user2", password: "2" },
];

function login() {
  var a = document.getElementById("inputuser").value;
  var b = document.getElementById("inputpass").value;
  // ////////////////// ADMIN /////////////////////

  if (a == users[0].name && b == users[0].password) {
    fn_ScreenChangeMain(
      "Scr_Start",
      "Scr_Main",
      "Scr_Main_s2",
      "Scr_SQL",
      "Scr_Diagram",
      "Scr_Alarm",
      "Scr_About",
      "dia-weight1",
      "dia-weight2",
      "dia-weight3",
      "dia-weight1_s2",
      "dia-weight2_s2",
      "dia-weight3_s2"
    );
    document.getElementById("login_hall").style.display = "none";
    document.getElementById('pag_2').style.visibility = "hidden";
    document.getElementById("userselect").value='ad';
  }
  // ////////////////// USER1 /////////////////////

  else if (a == users[1].name && b == users[1].password) {
    fn_ScreenChangeMain(
      "Scr_Start",
      "Scr_SQL",
      "Scr_Main",
      "Scr_Main_s2",
      "Scr_Diagram",
      "Scr_Alarm",
      "Scr_About",
      "dia-weight1",
      "dia-weight2",
      "dia-weight3",
      "dia-weight1_s2",
      "dia-weight2_s2",
      "dia-weight3_s2"
    );
    document.getElementById("login_hall").style.display = "none";
    document.getElementById("btt_Screen_Main_s2").disabled = true;
    document.getElementById("date-picker_s2").style.display = "none";
    document.getElementById("SQL_Table_s2").style.display = "none";
    document.getElementById("alarm_picker_s2").style.display = "none";
    document.getElementById("Alarm_Table_s2").style.display = "none";
    document.getElementById("pag_2").style.visibility = "hidden";
    document.getElementById("userselect").value='us1';
    var checkBox = document.getElementById("myCheckbox");
    checkBox.disabled = true;
  }
  // ////////////////// USER2 /////////////////////

  else if (a == users[2].name && b == users[2].password) {
    fn_ScreenChangeMain(
      "Scr_Start",
      "Scr_SQL",
      "Scr_Main",
      "Scr_Main_s2",
      "Scr_Diagram",
      "Scr_Alarm",
      "Scr_About",
      "dia-weight1",
      "dia-weight2",
      "dia-weight3",
      "dia-weight1_s2",
      "dia-weight2_s2",
      "dia-weight3_s2"
    );
    document.getElementById("login_hall").style.display = "none";
    document.getElementById("btt_Screen_Main").disabled = true;
    document.getElementById("date-picker").style.display = "none";
    document.getElementById("SQL_Table").style.display = "none";
    document.getElementById("alarm_picker").style.display = "none";
    document.getElementById("Alarm_Table").style.display = "none";
    document.getElementById("pag").style.visibility = "hidden";
    document.getElementById("userselect").value='us2';
    var checkBox = document.getElementById("myCheckbox");
    checkBox.checked = true;
    checkBox.disabled = true;
  }
  else {
    window.location.href = "";
    window.location.reload();
  }
}
function logout() {
// Ctrinh logout
  alert("Logout Successfully!");
  window.location.reload();
}
function cancel(){
  document.getElementById('login_hall').style.display='none';
  var scr_disable = document.getElementById("slidebar");
  var element_in_scr = scr_disable.querySelectorAll("*");
  element_in_scr.forEach((element) => {
    element.disabled = true;
  });
  document.getElementById("btt_Screen_Start").disabled = false;
  document.getElementById("btt_Screen_About").disabled = false;
}