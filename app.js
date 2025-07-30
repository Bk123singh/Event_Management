const express=require('express');
const mongoose=require('mongoose');
const Event=require('./models/Event.js');
const ExpressError=require('./utils/ExpressError.js');
const wrapasync=require('./utils/wrapasync.js');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const session=require('express-session');
const flash=require('connect-flash');
const Events =require('./router/Event.js');
const UserRouter=require("./router/user.js");
const User=require('./models/user.js');

const path=require('path');



const app=express();
const port=8080;

main().then(res=>console.log("mongoose is connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/EventManagement');

}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const sessionOption={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },

};

app.use(session(sessionOption));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})



app.use("/events", Events);
app.use("/", UserRouter);








app.use((err,req, res, next)=>{
    const {statusCode=500, message="Something went wrong"}=err;
   res.status(statusCode).send(message);
    
})

app.get("/", (req, res)=>{
    res.send("Hi, I'am root")
})

app.listen(port, ()=>{
    console.log(`server is running port no ${port}`);
})






