const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole
} = require('../controllers/user.js')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUserRole)

module.exports = router
