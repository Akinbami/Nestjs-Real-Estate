const mongoose = require('mongoose');
// const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');


const { Schema } = mongoose;

// CREAT PROFILE SCHEMA/MODELS
const RoomSchema = new Schema({

  number: {
    type: String,
    required: true,
    unique: true
  },

  type: {
    type: String,
    required: true,
  },

  floor: {
    type: String,
    required: true,
  },

  specialty: {
    type: Boolean,
    required: true,
    default: false
  },

  taken: {
    type: Boolean,
    required: true,
    default: false
  }

}, {
  timestamps: true,
});

RoomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Room', RoomSchema);