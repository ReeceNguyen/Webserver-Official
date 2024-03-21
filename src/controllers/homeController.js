const getHomeAdmin = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  if (req.session.loggedin) {
    res.render("home.ejs", { ipAddress });
  } else {
    res.redirect("/login");
  }
};

const getHomeUser1 = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  if (req.session.loggedin) {
    res.render("user1.ejs", { ipAddress });
  } else {
    res.redirect("/login");
  }
};
const getHomeUser2 = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  if (req.session.loggedin) {
    res.render("user2.ejs", { ipAddress });
  } else {
    res.redirect("/login");
  }
};
const getHomeGuest = (req, res) => {
  var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
  res.render("guest.ejs", { ipAddress });
};

module.exports = {
  getHomeAdmin: getHomeAdmin,
  getHomeUser1: getHomeUser1,
  getHomeUser2: getHomeUser2,
  getHomeGuest: getHomeGuest,
};
