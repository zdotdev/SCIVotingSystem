const express = require('express')
const router = express.Router()

const { signUp, signIn, signOut } = require('../controllers/auth.js')

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/signOut', signOut)

module.exports = router
