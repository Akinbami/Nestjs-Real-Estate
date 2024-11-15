const mongoose = require('mongoose');
// const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');


const { Schema } = mongoose;

// CREAT PROFILE SCHEMA/MODELS
const CheckListSchema = new Schema({

  checkedin: {
    type: Boolean,
    required: true,
    default: false
  },

  inspect: {
    type: Boolean,
    required: true,
    default: false
  },

  meet_roommates: {
    type: Boolean,
    required: true,
    default: false
  },

  settledin: {
    type: Boolean,
    required: true,
    default: false
  },

  get_room_key: {
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

CheckListSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Checklist', CheckListSchema);