const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const User = require('../models/User')

// router.post('/register', AuthController.register)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/details', AuthController.details)
//router.get('/:id', AuthController.getuserInfo)

router.route('/:id').get((req,res) => {
    const itemId = req.params.id
    User.findById(itemId)
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router