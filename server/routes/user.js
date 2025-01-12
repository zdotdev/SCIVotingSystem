const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  getAllNewUsers
} = require('../controllers/user.js')

router.get('/', getAllUsers)
router.get('/new', getAllNewUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUserRole)

module.exports = router
