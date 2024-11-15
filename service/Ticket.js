const Ticket = require('../models/Ticket');

const T = {
 
  async createTicket(user,data) {
    
    let response;
    try {

        response = await Ticket.create({user,...data});

    } catch (error) {
      throw new Error(error.message || 'failed to create room');
    }

    return response;
  },

  async getTicket(id) {
    let ticket; 
    try {
      ticket = await Ticket.findById(id);

      if (!ticket) return null;

    } catch (err) {
      throw new Error(err);
    }

    return ticket;
  },
  async getAllTickets({page, limit, sort}) {
    let response;
    try {
      var query = {};
      var options = {
          select: '-__v',
          page: page,
          limit: Number(limit),
          sort: { updatedAt: -1 },
          populate: 'user',

        };

      response = await Ticket.paginate(query, options);
    } catch (error) {
      throw new Error(error)
    }
    

    return response;
  },
  async getAllTicketsByuser({page, limit, sort, user}) {
    let response;
    try {
      var query = {user};
      var options = {
          select: '-__v',
          page: page,
          limit: Number(limit),
          sort: { updatedAt: -1 },
          populate: 'user',

        };

      response = await Ticket.paginate(query, options);
    } catch (error) {
      throw new Error(error)
    }
    

    return response;
  },

  async updateTicket(ticket, data) {
    const options = {
      new: true,
    };
    const response = await Ticket.findByIdAndUpdate(ticket._id.toString(), data, options);
    
    return response;
  },

  async deleteTicket(id) {
    const response = await Ticket.deleteOne({ _id: id });

    return response;
  },

};

module.exports = T;
