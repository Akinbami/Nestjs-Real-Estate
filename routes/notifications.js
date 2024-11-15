var express = require('express');
var router = express.Router();
const auth = require('../auth/Admin');

const NotificationController = require('../controllers/NotificationController');


router.param('id', NotificationController.params);

router.route('/')
  .get(auth.decodeToken,auth.getFreshUser,NotificationController.index)

// router.route('/:id')
//   .get(NotificationController.get)


module.exports = router;