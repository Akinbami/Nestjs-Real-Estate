var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate'),
    bcrypt = require('bcryptjs');

// 2. Define the MongoDB schema for the people collection
var userSchema = new Schema({
  matric: {
    type: String, 
    required: true,
    unique: true, 
  },
  email: {
    type: String, 
    unique: true, 
    lowercase: true, 
    required: true
  },
  role: {
    type: Number, 
    required: true,
    default: 0
  },
  password: {
    type: String, 
    required: true
  },
  
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
},{
  timestamps: true,
});

// 3. Paginate the results
userSchema.plugin(mongoosePaginate);

// 4. Encypt and store the person's password
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

// 5. Confirm a person's password against the stored password
userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// 6. Export the Person model
module.exports = mongoose.model('User', userSchema);