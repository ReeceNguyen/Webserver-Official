const express = require('express');
const router = express.Router();
const { getHomepage,getLoginpage } = require('../controllers/homeController')

let initWebRoutes = (app) => {
    router.get("/", getHomepage);
    router.get("/login",getLoginpage);
    return app.use("/",router)
}
module.exports = initWebRoutes;