const Application = require('../models/Application');
const Room = require('../models/Room');
const Ticket = require('../models/Ticket');


const S = {

  async getStatistics() {
      let applications;
      let rooms;
      let tickets;
    try {
        applications= await Application.countDocuments();
        rooms= await Room.countDocuments();
        tickets= await Ticket.countDocuments();

    } catch (err) {
      throw new Error(err);
    }
    

    return {applications, rooms, tickets};
  },

};

module.exports = S;
