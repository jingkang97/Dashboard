const express = require('express')
const router = express.Router()

const SimulateController = require('../controllers/SimulateController')

router.post('/simulatepost', SimulateController.simulatePost)
router.delete('/simulatedelete', SimulateController.simulateDelete)



module.exports = router