const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/UsersController')

router.get('/getUser', UsersController.getUser)
router.get('/getUsers', UsersController.getUsers)

module.exports = router