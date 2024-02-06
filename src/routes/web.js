const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')
const loginController = require('../controllers/loginController')

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomepage);
    router.get("/login",loginController.getLoginpage);
    return app.use("/",router)
}
module.exports = initWebRoutes;