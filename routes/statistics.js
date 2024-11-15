var express = require('express');

const auth = require('../auth/Admin');
var router = express.Router();

const StatisticsController = require('../controllers/StatisticsController');


router.route('/')
  .get(auth.decodeToken,auth.getFreshUser,StatisticsController.index)

module.exports = router;