const User = require('../models/user.js')
const mongoose = require('mongoose')

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    if (!users || !users.length) {
      return res.status(404).json({ message: 'No users found' })
    }

    return res
      .status(200)
      .json({ message: 'User list retrieved successfully.', user: users })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'User Id is required.' })
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User retrieved successfully.', user })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// delete user by id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'User Id is required.' })
    }

    const user = await User.find({ _id: id })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    try {
      await User.deleteOne({ _id: id })
      return res.status(200).json({ message: 'User deleted successfully.' })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  } catch (err) {}
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser
}
