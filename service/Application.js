const Application = require('../models/Application');
const Room = require('../models/Room');
const RoomService = require('./Room');


const A = {


  async getAllApplications({page, limit, sort}) {
    let response;
    try {
      var query = {};
      var options = {
          select: '-__v',
          page: page,
          limit: Number(limit),
          sort: { updatedAt: -1 },
          populate: 'user room',
      };
      response = await Application.paginate(query, options);
    } catch (error) {
      throw new Error(error)
    }
    

    return response;
  },

  async getApplication(id) {
    let application; 
    try {
      application = await Application.findById(id).populate("user room user.profile", "-__v").exec();

      if (!application) return null;

    } catch (err) {
      throw new Error(err);
    }

    return application;
  },

  async updateApplication(application, data) {
    let room;
    if(data.room_number){
      room = await RoomService.getRoomByNumber(data.room_number);
      if(!room){
        throw new Error("Room not Found")
      }
    }
    
    data.room = room._id

    const options = {
      new: true,
    };
    const response = await Application.findByIdAndUpdate(application._id.toString(), data, options);
    
    return response;
  },

  async deleteApplication(id) {
    const response = await Application.deleteOne({ _id: id });

    return response;
  },

};

module.exports = A;
