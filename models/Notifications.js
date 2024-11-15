const mongoose = require('mongoose');
// const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');


const { Schema } = mongoose;

// CREAT PROFILE SCHEMA/MODELS
const NotificationSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  
  checked: {
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

NotificationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Notification', NotificationSchema);