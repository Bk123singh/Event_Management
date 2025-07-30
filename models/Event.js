const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const eventSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    location:{
        type:String,
        require:true,
    },
    capacity:{
        type:Number,
        require:true,
        min:1,
        max:1000,
    },
    registerUser:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],

})

const Event=mongoose.model('Event', eventSchema);

module.exports=Event;