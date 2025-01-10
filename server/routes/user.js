const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getUserById,
  deleteUser
} = require('../controllers/user.js')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)

module.exports = router
