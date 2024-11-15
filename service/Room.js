const Room = require('../models/Room');

const R = {
 
  async createRoom(data) {
    
    let response;
    try {

        response = await Room.create(data);

    } catch (error) {
      throw new Error(error.message || 'failed to create room');
    }

    return response;
  },

  async getRoom(id) {
    let room; 
    try {
      room = await Room.findById(id).populate("application", "-__v").select("-__v").exec();

      if (!room) return null;

    } catch (err) {
      throw new Error(err);
    }

    return room;
  },

  async getRoomByNumber(number) {
    let room; 
    try {
      room = await Room.findOne({number}).populate("application", "-__v").select("-__v").exec();

      if (!room) return null;

    } catch (err) {
      throw new Error(err);
    }

    return room;
  },

  

  async getAllRooms({page, limit, sort}) {
    let response;
    try {
      var query = {};
      var options = {
          select: '-__v',
          page: page,
          limit: limit,
          sort: { updatedAt: -1 },
        };

      response = await Room.paginate(query, options);
    } catch (error) {
      throw new Error(error)
    }
    

    return response;
  },

  async updateRoom(room, data) {
    const options = {
      new: true,
    };
    const response = await Room.findByIdAndUpdate(room._id.toString(), data, options);
    
    return response;
  },

  async deleteRoom(id) {
    const response = await Room.deleteOne({ _id: id });

    return response;
  },

};

module.exports = R;
