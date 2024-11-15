const Notifications = require('../models/Notifications');

const N = {
 
  async createNotification(data) {
    
    let response;
    try {

        response = await Notifications.create(data);

    } catch (error) {
      throw new Error(error.message || 'failed to create notification');
    }

    return response;
  },

  async getNotification(id) {
    let notification; 
    try {
        notification = await Notifications.findById(id).exec();

      if (!room) return null;

    } catch (err) {
      throw new Error(err);
    }

    return room;
  },


  async getAllNotifications({page, limit, sort, open}) {
    let response;
    try {
      var query = {open};
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

  async updateNotification(notification, data) {
    const options = {
      new: true,
    };

    const response = await Notifications.findByIdAndUpdate(notification._id.toString(), data, options);
    
    return response;
  },

  async deleteNofication(id) {
    const response = await Notifications.deleteOne({ _id: id });

    return response;
  },

};

module.exports = N;



