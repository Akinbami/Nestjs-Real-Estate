const express = require('express');

const router = express.Router();
const UploadController = require('../controllers/UploadPictureController');

const multer = require("multer");
const upload = multer({dest: "/tmp/uploads/"});


router.route('/')
  .post(upload.single("file"),UploadController.upload);


module.exports = router;
