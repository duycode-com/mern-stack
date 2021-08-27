const express = require('express')
const router = express.Router()

const controller = require('../controllers/AuthController.js')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.post('/refresh-token', controller.refreshToken)

module.exports = router
