const express = require('express');
const router = express.Router();
router.get("/", function (req, res) {
    var ipAddress = "http://" + process.env.SERVER_IP + ":" + process.env.PORT;
    res.render("home.ejs", { ipAddress });
  });
module.exports = router;