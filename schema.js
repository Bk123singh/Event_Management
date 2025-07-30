const Joi=require('joi');
const { modelName } = require('./models/Event.js');
const Event = require('./models/Event.js');

module.exports.EventSchema = Joi.object({
  
    title: Joi.string().required(),
    location: Joi.string().required(),
    capacity: Joi.number().required().min(0).max(1000),
});


