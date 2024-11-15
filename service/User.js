// const { checklist } = require('../controllers/UserController');
const Application = require('../models/Application');
const Notifications = require('../models/Notifications');
const Profile = require('../models/Profile');
const Room = require('../models/Room');
const User = require('../models/User');
const Checklist = require('../models/Checklist');


// const Customer = require('../models/Customer');
// const Identity = require('../models/Identity');
// const Performance = require('../models/Performance');

// const cache = require('../utils/cache.service');
// const WalletService = require('./Wallet');

// const socketService = require('./Socket');

const U = {
  
  async createUser(data) {
    const {
      matric, email, password
    } = data;
    
    let response;
    try {

        response = await User.create(data);

    } catch (error) {
      throw new Error(error.message || 'failed to create user');
    }

    return response;
  },

  async createAdminUser(data) {
    const {
      matric, email, password, firstname, lastname
    } = data;
    
    let response;
    try {

        const profile = await Profile.create({firstname,lastname});

        response = await User.create({...data, role: 1, matric: email, profile});

    } catch (error) {
      throw new Error(error.message || 'failed to create admin user');
    }

    return response;
  },

  

  async getUser(id) {
    let user; 
    try {
      user = await User.findById(id).populate("profile notification checklist", "-__v").select('email matric profile').exec();

      if (!user) return null;

    } catch (err) {
      throw new Error(err);
    }

    return user;
  },

  async getUserByEmail(email){
    let user; 
    try {
      user = await User.findOne({email}).populate("profile", "-__v").select('email matric profile').exec();

      if (!user) return null;

    } catch (err) {
      throw new Error(err);
    }

    return user;
  },

  
  async getProfile(id){
    let profile; 
    try {
      profile = await Profile.findById(id);

      if (!profile) return null;

    } catch (err) {
      throw new Error(err);
    }

    return profile;
  },
  async getProfileByPhone(phone){
    let profile; 
    try {
      profile = await Profile.findOne({phone});

      if (!profile) return null;

    } catch (err) {
      throw new Error(err);
    }

    return profile;
  },

  async getAllUsers({page=1, limit=20, sort}) {
    let response;
    try {
      var query = {};
      var options = {
          select: 'matric email',
          page: page
        };

      // response = await User.paginate(query, options);
      response = await User.find();

    } catch (error) {
      throw new Error(error)
    }
    

    return response;
  },

  async getAllNotifications({open, limit, page, user}){
    let response;
    try {
      var query = {open,user};
      var options = {
          select: '-__v',
          page: page,
          limit: limit,
          sort: { updatedAt: -1 },
        };

      response = await Notifications.paginate(query, options);
    } catch (error) {
      throw new Error(error)
    }
    

    return response;
  },

  async updateUser(user, data) {
    const options = {
      new: true,
    };
    const response = await User.findByIdAndUpdate(user._id.toString(), data, options);


    
    
    return response;
  },

  async updateProfile(user, data) {
    const options = {
      new: true,
    };

    const response = await Profile.findByIdAndUpdate(user.profile._id.toString(), data, options);
    console.log("this is the response body", response)
    return response;
  },

  async deleteUser(id) {
    const response = await User.deleteOne({ _id: id });

    return response;
  },

  async createprofile(user, data){
      console.log(user)
      try {
        if (user.profile){
          // update profile
          const profile = await Profile.findByIdAndUpdate(user.profile._id.toString(),data, {new:true});
          user = await User.findById(user._id).populate("profile", "-__v").select('email matric profile').exec();;
        }else{
          // create profile
          const profile = await Profile.create(data);
          if(profile){
            user.profile = profile;
            user.save()
          }
        }
      } catch (error) {
        throw new Error(error)
      }
  
      return user;
  },

  async createApplication(user, data){
    let application;
    try {
      // get available room
      const room = await Room.findOne({taken: false, type:data.room_type, specialty: data.health_condition});

      if(!room){
        throw new Error("no room available!!!")
      }
      // create application
      application = await Application.create({
        ...data, 
        firstname: user.profile.firstname,
        lastname: user.profile.lastname,
        user: user._id.toString(), 
        room: room._id.toString()
      });

      if(application){
        room.taken = true;
        room.save()
      }
      
    } catch (error) {
      throw new Error(error)
    }

    return application;
},

async getAllAdminUsers({page, limit, sort}) {
  let response;
  try {
    var query = {};
    var options = {
        select: 'matric email',
        page: page
      };

    // response = await User.paginate(query, options);
    response = await User.find({
      role: 1
    }).sort({ createdAt: -1 }).populate("profile").exec();

  } catch (error) {
    throw new Error(error)
  }
  

  return response;
},

async getChecklist(user){
  let response;
  try {
    response = await Checklist.findOne({user});
  } catch (error) {
    throw new Error(error)
  }

  return response;
},

async updateChecklist(data) {
  const {id,key} = data;

  let field; let response;
  switch (key){
    case 1:
      response = await Checklist.findByIdAndUpdate(id, {checkedin: true}, {new: true});
      break;
    case 2:
      response = await Checklist.findByIdAndUpdate(id, {inspect: true}, {new: true});
      break;
    case 3:
      response = await Checklist.findByIdAndUpdate(id, {meet_roommates: true}, {new: true});
      break;
    case 4:
      response = await Checklist.findByIdAndUpdate(id, {settledin: true}, {new: true});
      break;
    case 5:
      response = await Checklist.findByIdAndUpdate(id, {get_room_key: true}, {new: true});
      break;
    default:
      console.log("key")
  }
  // const options = {
  //   new: true,
  // };

  console.log("this is the response body", response)
  return response;
},



//   async deleteAgentByIdentity(id) {
//     let response;
//     try {
//       await Agent.deleteOne({ identity: id });
//       response = await Identity.deleteOne({ _id: id });
//     } catch (err) {
//       response = err;
//     }

//     return response;
//   },

//   async getAgentByIdentity(id) {
//     let agent; let statistics;
//     try {
//       agent = await Agent.findOne({ identity: id }).populate('identity', 'name email phone').exec();

//       statistics = await cache.GET_ASYNC('statistics');
//       statistics = JSON.parse(statistics);
//       if (!statistics) {
//         // calculating total summary
//         console.log('calculating total summary.');
//         statistics = {};
//         statistics.totalCustomers = agent.customers.length;
//         statistics.balance = 0;
//         statistics.withdrawals = 0;

//         // setting the cache
//         const savedStats = await cache.SET_ASYNC('statistics', JSON.stringify(statistics), 'EX', 5);
//         console.log(savedStats);
//       }
//     } catch (err) {
//       return err;
//     }
//     const response = {
//       ...agent.toJSON(),
//       summary: statistics,
//     };
//     return response;
//   },
};

module.exports = U;
