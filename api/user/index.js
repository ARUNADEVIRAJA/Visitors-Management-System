// api/user/index.js
const express = require('express')
const router = express.Router()
const { getAllUsers, loginUser } = require('./user')

router.get('/', getAllUsers)

router.post('/login', loginUser)
module.exports = router
