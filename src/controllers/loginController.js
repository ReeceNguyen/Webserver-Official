var { sqlaccount } = require("../config/connectDB");
let getLoginpage = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  res.render("loginpage.ejs", { ipAddress });
};

let handleLogin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = "SELECT * FROM " + process.env.TABLE_ACCOUNT + " WHERE Name = ? AND Password = ?";
  if (username && password) {
    sqlaccount.query(
      query,
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          if (username === "admin") {
            res.redirect("/admin");
          } else if (username === "user1") {
            res.redirect("/user1");
          } else if (username === "user2") {
            res.redirect("/user2");
          }
        } else {
          res.redirect('/login');
        }
        res.end();
      }
    );
  } else {
    res.end();
  }
};
let postLogOut = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
let checkLoggedIn1 = (req, res, next) => {
  if (req.session.username === "user1") {
      next();
  } else {
      res.redirect('/login');
  }
}
let checkLoggedIn2 = (req, res, next) => {
  if (req.session.username === "user2") {
      next();
  } else {
      res.redirect('/login');
  }
}
let checkLoggedIn0 = (req, res, next) => {
  if (req.session.username === "admin") {
      next();
  } else {
      res.redirect('/login');
  }
}
module.exports = {
  getLoginpage: getLoginpage,
  handleLogin: handleLogin,
  postLogOut: postLogOut,
  checkLoggedIn1: checkLoggedIn1,
  checkLoggedIn2: checkLoggedIn2,
  checkLoggedIn0: checkLoggedIn0
};
