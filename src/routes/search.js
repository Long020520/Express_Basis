const express = require('express')
const router = express.Router()

const searchControllers = require('../controllers/search.controller')

router.get('/search', searchControllers.getSearch)

router.post('/search', searchControllers.postSearch)

module.exports = router;
