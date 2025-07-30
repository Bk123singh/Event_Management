const Event=require('./models/Event.js');
const ExpressError = require("./utils/ExpressError.js");
const { EventSchema, userSchema } = require("./schema.js");


module.exports.isLogin=(req, res, next)=>{
if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error", "you must be logged in to create listing")
   return res.redirect('/login')
}
next();
}

module.exports.saveRedirectUrl=(req, res, next)=>{
    if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
  }
    next();
}


module.exports.isOwner=async(req, res, next)=>{
  let {id}=req.params;
  const reviewDoc = await Review.findById(reviewId);
  if(!reviewDoc.author.equals(res.locals.currUser._id)){
    req.flash('error', "you are not owner of this listing");
    return res.redirect(`/listings/${id}`)
  }
  next();
}
