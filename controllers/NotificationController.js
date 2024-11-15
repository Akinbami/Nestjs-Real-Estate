const NotificationService = require('../service/Notification');
const UserService = require('../service/User');

const dbConnection = require('../mongoose');

exports.params = async (req, res, next, id) => {
  await dbConnection();

    const notification = await NotificationService.getNotification(id);
    if (!notification) {
      next(new Error(`no room with the id ${id}`));
    } else {
      req.notification = notification;
      next();
    }
};

exports.index = async (req, res) => {
    // this controller gets the details of the agent making the request
    const { user } = req;
    const {page=1, limit=100, open=false} = req.query;
    await dbConnection();

    const notifications = await UserService.getAllNotifications({page,limit,open: Boolean(open),user});
    res.json({
        message: 'Notifications fetched successfully!',
        data: notifications,
    });
};