const loginController = require('../controllers/loginController')
const getHomepage = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  res.render("home.ejs", { ipAddress });
};

const getLoginpage =  loginController.Loginpage;

module.exports = {
  getHomepage : getHomepage,
  getLoginpage : getLoginpage,
};
