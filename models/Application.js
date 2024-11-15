const mongoose = require('mongoose');
// const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');


const { Schema } = mongoose;

// CREAT PROFILE SCHEMA/MODELS
const ApplicationSchema = new Schema({
  firstname: {
    type: String,
  },

  lastname: {
    type: String,
  },

  room_type: {
    type: String,
    required: true,
  },

  room_type_year: {
    type: Number,
    required: true,
  },

  paid: {
    type: Boolean,
    required: true,
  },

  amount: {
    type: String,
    required: true,
  },

  payment_reference: {
    type: String,
    required: true,
  },

  health_condition: {
    type: Boolean,
    required: true,
    default: false
  },

  report: {
    type: String,
  },

  select_roommate: {
    type: Boolean,
    required: true,
    default: false
  },

  roommate_name: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room"
  }
}, {
  timestamps: true,
});

ApplicationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Application', ApplicationSchema);