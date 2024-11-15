var express = require('express');
var router = express.Router();
const auth = require('../auth/Admin');

const RoomController = require('../controllers/RoomController');


router.param('id', RoomController.params);

router.route('/')
  .get(auth.decodeToken,auth.getFreshUser,RoomController.index)
  .post(auth.decodeToken,auth.getFreshUser,RoomController.create);


router.route('/:id')
  .get(RoomController.get)
  .put(auth.decodeToken,auth.getFreshUser,RoomController.update)
  .delete(auth.decodeToken,auth.getFreshUser,RoomController.delete);


module.exports = router;