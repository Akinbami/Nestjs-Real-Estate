var express = require('express');
var router = express.Router();
const auth = require('../auth/Admin');

const ProfileController = require('../controllers/ProfileController');


router.param('id', ProfileController.params);


router.route('/:id')
  .put(ProfileController.update)


module.exports = router;