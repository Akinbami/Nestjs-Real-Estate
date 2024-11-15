const mongoose = require('mongoose');
// const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');


const { Schema } = mongoose;

// CREAT PROFILE SCHEMA/MODELS
const TicketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  pictures: {
    type: String,
  },

  category: {
    type: String,
    required: true,
  },
  
  resolved: {
    type: Boolean,
    required: true,
    default: false
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  
}, {
  timestamps: true,
});

TicketSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Ticket', TicketSchema);