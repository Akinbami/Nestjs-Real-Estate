var express = require('express');
var router = express.Router();

const auth = require('../auth/Admin');



const ApplicationController = require('../controllers/ApplicationController');


router.param('id', ApplicationController.params);

router.route('/')
  .get(auth.decodeToken, auth.getFreshUser, ApplicationController.index)

router.route('/:id')
  .get(auth.decodeToken, auth.getFreshUser, ApplicationController.get)
  .put(auth.decodeToken, auth.getFreshUser, ApplicationController.update)
  .delete(auth.decodeToken, auth.getFreshUser, ApplicationController.delete)


module.exports = router;