const wrapasync = require("../utils/wrapasync.js");
const Event = require("../models/Event.js");
const User = require("../models/user.js");

module.exports.index = wrapasync(async (req, res) => {
  let data = await Event.find({});
  res.render("EventEjs/index.ejs", { data });
});

module.exports.newFile = (req, res) => {
  res.redirect("EventEjs/new.ejs");
};

module.exports.getEvent=wrapasync(async(req, res)=>{
  const event =await Event.findById(req.params.id).populate("registerUser")
  if(!event){
    req.flash('error', 'Event not found. ')
    return res.redirect('/events');
  }
  res.json(event);
})

module.exports.CreateUser = wrapasync(async (req, res) => {
  const { title, location, capacity } = req.body;
  if (capacity < 1 || capacity > 1000) {
    req.flash("error", "Capacity must be between 1 and 1000.");
    return res.redirect("back");
  }
  const newEvent = new Event({
    title: title,
    location: location,
    capacity: capacity,
  });
  await newEvent.save();

  req.flash("success", "Event created successfully.");
  res.redirect(`/events/${event._id}`);
});

module.exports.registerEvent = async (req, res) => {
  const { userId, name, email } = req.body;
  const event = await Event.findById(req.params.id);
  if (!event) {
    req.flash("error", "Event not found.");
    return res.redirect("back");
  }
  if (new Date(event.dateTime) < new Date()) {
    req.flash("error", "Cannot register for past events.");
    return res.redirect("back");
  }
  if (event.registrations.length >= event.capacity) {
    req.flash("error", "Event is full.");
    return res.redirect("back");
  }
  let user = await User.findById(userId);
  if (!user) {
    user = new User({ _id: userId, name, email });
    await user.save();
  }

  if (event.registrations.includes(user._id)) {
    req.flash("error", "User already registered.");
    return res.redirect("back");
  }

  event.registrations.push(user._id);
  await event.save();
  req.flash("success", "Successfully registered!");
  res.redirect(`/events/${event._id}`);
};

module.exports.canRegister = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    req.flash("error", "Event not found.");
    return res.redirect("back");
  }

  const index = event.registrations.indexOf(req.params.userId);
  if (index === -1) {
    req.flash("error", "User is not registered for this event.");
    return res.redirect("back");
  }

  event.registrations.splice(index, 1);
  await event.save();

  req.flash("success", "Registration cancelled.");
  res.redirect(`/events/${event._id}`);
};
