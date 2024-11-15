var express = require('express');
var router = express.Router();
const auth = require('../auth/Admin');

const TicketController = require('../controllers/TicketController');


router.param('id', TicketController.params);

router.route('/')
  .get(auth.decodeToken,auth.getFreshUser,TicketController.index)
  .post(auth.decodeToken,auth.getFreshUser,TicketController.create);


router.route('/:id')
  .get(auth.decodeToken,auth.getFreshUser,TicketController.get)
  .put(auth.decodeToken,auth.getFreshUser,TicketController.update)
  .delete(auth.decodeToken,auth.getFreshUser,TicketController.delete);


module.exports = router;