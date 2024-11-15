const mongoose = require('mongoose');
// const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');


const { Schema } = mongoose;

// CREAT PROFILE SCHEMA/MODELS
const ProfileSchema = new Schema({

  firstname: {
    type: String,
  },

  lastname: {
    type: String,
  },

  phone: {
    type: String,
    // required: true,
    // unique: true,
  },

  gender: {
    type: String,
  },

  dob: {
    type: String,
  },

  address: {
    type: String,
  },

  picture: {
    type: String,
  },

  guarantor: {
    name: {
      type: String,
      // require: true,
    },
    address: {
      type: String,
      // require: true,
    },
    phone: {
      type: String,
      require: false,
    },
  },

//   address: {
//     street: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     state: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ['DENIED', 'APPROVED', 'PENDING', 'FAILED'],
//     default: 'PENDING',
//   },
}, {
  timestamps: true,
});

ProfileSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Profile', ProfileSchema);