const express = require('express')
const router = express.Router()

const {
  signUp,
  signIn,
  signOut,
  loginWithRefreshToken
} = require('../controllers/auth.js')

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/signOut', signOut)
router.post('/loginWithRefreshToken', loginWithRefreshToken)

module.exports = router
