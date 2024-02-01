const express = require('express');
const router = express.Router();
const { getHomepage,getLoginpage } = require('../controllers/homeController')

router.get("/", getHomepage);
router.get("/login",getLoginpage);

module.exports = router;