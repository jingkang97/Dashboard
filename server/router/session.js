const express = require('express')
const router = express.Router()

const SessionController = require('../controllers/SessionController')

router.post('/postSession', SessionController.postSession)
router.get('/getSessions', SessionController.getSessions)


module.exports = router