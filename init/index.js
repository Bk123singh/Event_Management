const mongoose=require('mongoose');
const sampleEvents = require('./data');
const Event=require('../models/Event.js');

main().then(res=>console.log("mongoose is connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/EventManagement');

}


const initdata=async()=>{
  await  Event.deleteMany({})
  await  Event.insertMany(sampleEvents);
  console.log("Data was created");
    
}
initdata();