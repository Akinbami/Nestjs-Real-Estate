var express = require('express');
const auth = require('../auth/Admin');
var router = express.Router();

const UserController = require('../controllers/UserController');
const ProfileController = require('../controllers/ProfileController');
const ApplicationController = require('../controllers/ApplicationController');



router.param('id', UserController.params);

router.route('/')
  .get(UserController.index)
  .post(UserController.create);


router.route('/checklist')
  .get(auth.decodeToken, auth.getFreshUser, UserController.checklist)
  .put(auth.decodeToken, auth.getFreshUser, UserController.updateChecklist)


router.route('/:id')
  .get(UserController.get)
  .put(UserController.update)
  .delete(UserController.delete);
  // .get(auth.decodeToken, auth.getFreshUser, UserController.get);

router.route('/:id/profile')
  .post(ProfileController.create)
  .put(ProfileController.update)

router.route('/:id/application')
  .post(ApplicationController.create)

  // app.get('/people', ensureAuthenticated, People.list);
  // app.get('/people/page/:page', ensureAuthenticated, People.list);
  // app.get('/people/:id', ensureAuthenticated, People.show);
  // app.get('/profile', ensureAuthenticated, People.profile);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
