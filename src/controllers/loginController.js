const getLoginpage = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  res.render("loginpage.ejs", { ipAddress });
};

module.exports = {
    getLoginpage: getLoginpage
}