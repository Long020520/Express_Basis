var express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller')

/* GET users listing. */
router.get('/', userController.getUsers);
router.post('/user', userController.postUser)

module.exports = router;
