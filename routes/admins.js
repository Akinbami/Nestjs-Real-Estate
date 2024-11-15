var express = require('express');
const auth = require('../auth/Admin');
var router = express.Router();

const AdminController = require('../controllers/Admin/UserController');
const TicketController = require('../controllers/Admin/TicketController');


router.param('id', AdminController.params);

router.route('/')
  .get(auth.decodeToken, auth.getFreshUser,AdminController.index)
  .post(auth.decodeToken, auth.getFreshUser,AdminController.create);

router.route('/tickets')
  .get(auth.decodeToken, auth.getFreshUser,TicketController.index)

router.route('/:id')
  .get(auth.decodeToken, auth.getFreshUser, AdminController.get)
  .put(auth.decodeToken, auth.getFreshUser, AdminController.update)
  .delete(auth.decodeToken, auth.getFreshUser, AdminController.delete);


module.exports = router;
