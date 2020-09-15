var express = require('express');
var router = express.Router();

const imageController = require('../controllers/image.controller')

/* GET users listing. */
router.post('/image', imageController.postImage)
router.get('/image', imageController.getImage)

module.exports = router;

