const TicketService = require('../service/Ticket');
// const { roomSchema } = require('../utils/RoomSchemaValidator');
const dbConnection = require('../mongoose');

exports.params = async (req, res, next, id) => {
  await dbConnection();

    const ticket = await TicketService.getTicket(id);
    if (!ticket) {
      next(new Error(`no ticket with the id ${id}`));
    } else {
      req.ticket = ticket;
      next();
    }
};

exports.index = async (req, res) => {
    // this controller gets the details of the agent making the request
      const { user } = req;
    const {page=1, limit=100} = req.query;
    await dbConnection();

    const tickets = await TicketService.getAllTicketsByuser({page,limit, user});
    res.json({
        message: 'Tickets fetched successfully!',
        data: tickets,
    });
};

exports.get = async (req, res, next) => {
    const { ticket } = req;
    return res.json({
      message: 'Ticket fetched successfully!',
      data: ticket,
    });
  };

exports.create = async (req, res) => {
    const {user} = req;
    const data = req.body;
  await dbConnection();
    try {
        // creating an identity for the agent
        // const validatedData = await roomSchema.validateAsync(req.body);
        // console.log(validatedData);

        // check if room exists
        // const ticket = await TicketService.getRoomByNumber(req.body);
        // if(room){
        //     return  res.json({
        //         error: true,
        //         message: `Room with number ${validatedData.number} already exist.`,
        //         });
        // }

        const response = await TicketService.createTicket(user,data);

        res.json({
            message: 'Ticket created successfully!',
            data: response,
        });

    } catch (err) {
        res.json({
        error: true,
        message: err.message,
        });
    }
};


exports.update = async (req, res, next) => {
    const { ticket } = req;
    await dbConnection();
    try {
      if (!ticket) {
        res.json({
          message: 'ticket not found!!!',
        });
      } else {
        const data = req.body;
  
        // updating agent
        const response = await TicketService.updateTicket(ticket, data);
  
        res.json({
          message: 'Ticket updated successfully!',
          data: response,
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.delete = async (req, res) => {
    const { ticket } = req;
    await dbConnection();
    const removed = await TicketService.deleteTicket(ticket.id);
    res.json({
      message: 'Ticket deleted successfully!',
      data: removed,
    });
  };
  