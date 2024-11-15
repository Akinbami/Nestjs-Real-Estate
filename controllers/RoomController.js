const RoomService = require('../service/Room');
const { roomSchema } = require('../utils/RoomSchemaValidator');
const dbConnection = require('../mongoose');

exports.params = async (req, res, next, id) => {
  await dbConnection();

    const room = await RoomService.getRoom(id);
    if (!room) {
      next(new Error(`no room with the id ${id}`));
    } else {
      req.room = room;
      next();
    }
};

exports.index = async (req, res) => {
    // this controller gets the details of the agent making the request
    //   const { user } = req;
    const {page=1, limit=100} = req.query;
    await dbConnection();

    const rooms = await RoomService.getAllRooms({page,limit});
    res.json({
        message: 'Rooms fetched successfully!',
        data: rooms,
    });
};

exports.get = async (req, res, next) => {
    const { room } = req;
    return res.json({
      message: 'Room fetched successfully!',
      data: room,
    });
  };

exports.create = async (req, res) => {
  await dbConnection();
    try {
        // creating an identity for the agent
        const validatedData = await roomSchema.validateAsync(req.body);
        // console.log(validatedData);

        // check if room exists
        const room = await RoomService.getRoomByNumber(validatedData.number);
        if(room){
            return  res.json({
                error: true,
                message: `Room with number ${validatedData.number} already exist.`,
                });
        }

        const response = await RoomService.createRoom(validatedData);

        res.json({
            message: 'Room created successfully!',
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
    const { room } = req;
    await dbConnection();
    try {
      if (!room) {
        res.json({
          message: 'room not found!!!',
        });
      } else {
        const data = req.body;
  
        // updating agent
        const response = await RoomService.updateRoom(room, data);
  
        res.json({
          message: 'Room updated successfully!',
          data: response,
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.delete = async (req, res) => {
    const { room } = req;
    await dbConnection();
    const removed = await RoomService.deleteRoom(room.id);
    res.json({
      message: 'Room deleted successfully!',
      data: removed,
    });
  };
  