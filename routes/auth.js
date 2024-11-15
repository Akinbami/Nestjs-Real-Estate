var express = require('express');
var router = express.Router();

const auth = require('../auth/Admin');
const AuthController = require('../controllers/Admin/AuthController');

router.route('/signin')
  .post(auth.verifyUser,AuthController.signin)
  // .post(auth.decodeToken, auth.getFreshUser, CustomerController.create);

router.route('/register')
  .post(AuthController.signin)

router.route('/verify-token')
  .post(AuthController.verifyToken)

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
