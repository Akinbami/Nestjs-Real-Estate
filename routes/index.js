var express = require('express');
var router = express.Router();

const adminRouter = require('./admins');
const authRouter = require('./auth');
const userRouter = require('./users');
const uploadRouter = require('./uploadRoutes');
const roomRouter = require('./room');
const statisticRouter = require('./statistics');
const ticketsRouter = require('./tickets');
const applicationRouter = require('./application');
const profileRouter = require('./profile');
const notificationRouter = require('./notifications');





router.use('/admins', adminRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/upload', uploadRouter);
router.use('/rooms', roomRouter);
router.use('/applications', applicationRouter);
router.use('/statistics', statisticRouter);
router.use('/tickets', ticketsRouter);
router.use('/profiles', profileRouter);
router.use('/notifications', notificationRouter);






module.exports = router;
