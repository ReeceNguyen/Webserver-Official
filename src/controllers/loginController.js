var { sqlaccount } = require("../config/connectDB");
let getLoginpage = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  res.render("loginpage.ejs", {
    ipAddress: ipAddress,
    alertMsg: req.flash("error"),
  });
};
// Authenticate User
let handleLogin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = "SELECT * FROM " + process.env.TABLE_ACCOUNT;
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
          req.session.password = password;
          if (username == results[0].Email && password == results[0].Password) {
            sqlaccount.query(
              "UPDATE " +
                process.env.TABLE_ACCOUNT +
                " SET LoginTime = NOW() WHERE ID = ?",
              [results[0].ID],
              (err, results) => {
                if (err) throw err;
              }
            );
            res.redirect("/admin");
          } else if (
            username == results[1].Email &&
            password == results[1].Password
          ) {
            sqlaccount.query(
              "UPDATE " +
                process.env.TABLE_ACCOUNT +
                " SET LoginTime = NOW() WHERE ID = ?",
              [results[1].ID],
              (err, results) => {
                if (err) throw err;
              }
            );
            res.redirect("/user1");
          } else if (
            username == results[2].Email &&
            password == results[2].Password
          ) {
            sqlaccount.query(
              "UPDATE " +
                process.env.TABLE_ACCOUNT +
                " SET LoginTime = NOW() WHERE ID = ?",
              [results[2].ID],
              (err, results) => {
                if (err) throw err;
              }
            );
            res.redirect("/user2");
          } else {
            req.flash("error", "Wrong email or password");
            res.redirect("/login");
          }
        } else {
          res.redirect("/login");
        }
        res.end();
      }
    );
  } else {
    res.end();
  }
};
// Check Log Out

let postLogout0 = (req, res) => {
  req.session.destroy();
  sqlaccount.query(
    "SELECT * FROM " + process.env.TABLE_ACCOUNT,
    (error, results) => {
      if (error) throw error;
      sqlaccount.query(
        "UPDATE " +
          process.env.TABLE_ACCOUNT +
          " SET LogoutTime = NOW() WHERE ID = ?",
        [results[0].ID],
        (error, results) => {
          if (error) throw error;
        }
      );
    }
  );
  res.redirect("/login");
};

let postLogout1 = (req, res) => {
  req.session.destroy();
  sqlaccount.query(
    "SELECT * FROM " + process.env.TABLE_ACCOUNT,
    (error, results) => {
      if (error) throw error;
      sqlaccount.query(
        "UPDATE " +
          process.env.TABLE_ACCOUNT +
          " SET LogoutTime = NOW() WHERE ID = ?",
        [results[1].ID],
        (error, results) => {
          if (error) throw error;
        }
      );
    }
  );
  res.redirect("/login");
};

let postLogout2 = (req, res) => {
  req.session.destroy();
  sqlaccount.query(
    "SELECT * FROM " + process.env.TABLE_ACCOUNT,
    (error, results) => {
      if (error) throw error;
      sqlaccount.query(
        "UPDATE " +
          process.env.TABLE_ACCOUNT +
          " SET LogoutTime = NOW() WHERE ID = ?",
        [results[2].ID],
        (error, results) => {
          if (error) throw error;
        }
      );
    }
  );
  res.redirect("/login");
};
// Check Login
let checkLoggedIn1 = (req, res, next) => {
  let query = "SELECT * FROM " + process.env.TABLE_ACCOUNT;
  sqlaccount.query(query, (err, results, fields) => {
    if (err) throw err;
    if (req.session.username === results[1].Email) {
      next();
    } else {
      res.redirect("/login");
    }
  });
};

let checkLoggedIn2 = (req, res, next) => {
  let query = "SELECT * FROM " + process.env.TABLE_ACCOUNT;
  sqlaccount.query(query, (err, results, fields) => {
    if (err) throw err;
    if (req.session.username === results[2].Email) {
      next();
    } else {
      res.redirect("/login");
    }
  });
};

let checkLoggedIn0 = (req, res, next) => {
  let query = "SELECT * FROM " + process.env.TABLE_ACCOUNT;
  sqlaccount.query(query, (err, results, fields) => {
    if (err) throw err;
    if (req.session.username === results[0].Email) {
      next();
    } else {
      res.redirect("/login");
    }
  });
};
module.exports = {
  getLoginpage: getLoginpage,
  handleLogin: handleLogin,
  postLogOut0: postLogout0,
  postLogout1: postLogout1,
  postLogout2: postLogout2,
  checkLoggedIn1: checkLoggedIn1,
  checkLoggedIn2: checkLoggedIn2,
  checkLoggedIn0: checkLoggedIn0,
};
