const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// router.post('/register', AuthController.register)
router.post('/', AuthController.register)

module.exports = router