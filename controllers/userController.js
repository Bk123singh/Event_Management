const wrapAsync=require('../utils/wrapasync.js')
const {saveRedirectUrl}=require('../middleware.js');
const passport = require("passport");
const User = require("../models/user");


module.exports.signUpPage=(req, res) => {
  res.render("users/signup.ejs");
}

module.exports.saveData= wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const regiserUser = await User.register(newUser, password);
      console.log(regiserUser);
      req.login(regiserUser, (err)=>{
        if(err){
          return next(err);
        }
         req.flash("sucess", "Welcome to Wanderlust");
        res.redirect("/events");
      })
     
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })

module.exports.logInPage=(req, res) => {
  res.render("users/login.ejs");
}

module.exports.saveLogData= saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    const redirectUrl = res.locals.redirectUrl || '/events';
    res.redirect(redirectUrl);
  }

  module.exports.logout=(req, res, next)=>{
  req.logOut((err)=>{
    if(err){
    return  next();
    }
    req.flash("success", "you are logged out !" )
    res.redirect('/events')
  })
}