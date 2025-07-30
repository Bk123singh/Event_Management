const express = require("express");
const router = express.Router();
const wrapasync= require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const { EventSchema } = require("../schema.js");
const Event = require("../models/Event.js");
const session = require("express-session");
const { isLogin, isOwner } = require("../middleware.js");
const contrtoller=require('../controllers/eventController.js')



router.get("/events",contrtoller.index );
router.get("/events/new", contrtoller.newFile )
router.get('/:id', contrtoller.getEvent)
router.post("/events", contrtoller.CreateUser);
router.post('/:id/events',contrtoller.registerEvent);
;
router.delete('/:id/events/:userId', contrtoller.canRegister);

module.exports=router;
