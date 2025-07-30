const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapasync.js");
const { route } = require("./Event");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const controller=require('../controller/userController.js')

router.get("/signup", controller.signUpPage);

router.post("/signup", controller.saveData);

router.get("/login", controller.logInPage);

router.post("/login",controller.saveLogData);


router.get('/logout', controller.logout)

module.exports = router;
