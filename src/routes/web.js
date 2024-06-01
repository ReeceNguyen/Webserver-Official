const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const path = require("path");
const fs = require("fs");

let initWebRoutes = (app) => {
  // router.get("/",loginController.getLoginpage);
  router.get("/", homeController.getHomeGuest);
  router.get(
    "/admin",
    loginController.checkLoggedIn0,
    homeController.getHomeAdmin
  );
  router.get(
    "/user1",
    loginController.checkLoggedIn1,
    homeController.getHomeUser1
  );
  router.get(
    "/user2",
    loginController.checkLoggedIn2,
    homeController.getHomeUser2
  );

  router.get("/login", loginController.getLoginpage);
  router.get("/logout0", loginController.postLogOut0);
  router.get("/logout1", loginController.postLogout1);
  router.get("/logout2", loginController.postLogout2);
  router.get("/exit0", loginController.exit0);
  router.get("/exit1", loginController.exit1);
  router.get("/exit2", loginController.exit2);
  router.post("/login", loginController.handleLogin);
  router.post("/saveImage1", (req, res) => {
    var img = req.body.img.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(
      path.join(
        __dirname,
        "../public/reports/trend",
        req.body.filename + ".png"
      ),
      img,
      "base64",
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
  router.post("/saveImage2", (req, res) => {
    var img = req.body.img.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(
      path.join(
        __dirname,
        "../public/reports/trend_s2",
        req.body.filename + ".png"
      ),
      img,
      "base64",
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
  return app.use("/", router);
};
module.exports = initWebRoutes;
