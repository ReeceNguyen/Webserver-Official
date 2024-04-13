const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')
const loginController = require('../controllers/loginController')

let initWebRoutes = (app) => {
    // router.get("/",loginController.getLoginpage);
    router.get("/",homeController.getHomeGuest);
    router.get("/admin",loginController.checkLoggedIn0,homeController.getHomeAdmin);
    router.get("/user1",loginController.checkLoggedIn1,homeController.getHomeUser1);
    router.get("/user2",loginController.checkLoggedIn2,homeController.getHomeUser2);

    router.get("/login",loginController.getLoginpage);
    router.get("/logout0",loginController.postLogOut0);
    router.get("/logout1",loginController.postLogout1);
    router.get("/logout2",loginController.postLogout2);
    router.post("/login",loginController.handleLogin);
    return app.use("/",router)
}
module.exports = initWebRoutes;