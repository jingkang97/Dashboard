const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/UsersController')

router.get('/getUser/:username', UsersController.getUser)
router.get('/getUsers', UsersController.getUsers)
router.put('/editUser', UsersController.editUser)
router.put('/addSession', UsersController.addSession)

module.exports = router