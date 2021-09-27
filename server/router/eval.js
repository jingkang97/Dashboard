const express = require('express')
const router = express.Router()

const EvalController = require('../controllers/EvalController')

router.get('/eval', EvalController.getEval)

module.exports = router