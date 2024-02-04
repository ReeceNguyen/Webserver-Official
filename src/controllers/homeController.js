const getHomepage = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  res.render("home.ejs", { ipAddress });
};

const getLoginpage = (req, res) => {
  var ipAddress =
    "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  res.render("loginpage.ejs", { ipAddress });
};

module.exports = {
  getHomepage : getHomepage,
  getLoginpage : getLoginpage,
};
