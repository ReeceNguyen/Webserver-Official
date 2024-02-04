const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomepage);
    router.get("/login",homeController.getLoginpage);
    return app.use("/",router)
}
module.exports = initWebRoutes;