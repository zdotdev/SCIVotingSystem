const User = require('../models/user.js')
const UserZodSchema = require('../zod/user.js')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// Sign up
const signUp = async (req, res) => {
  try {
    const { name, email, password, image, studentId } = req.body
    const parserBody = UserZodSchema.pick({
      name: true,
      email: true,
      password: true,
      image: true,
      studentId: true
    }).safeParse(req.body)
    if (!parserBody.success) {
      return res
        .status(422)
        .json({ message: parserBody.error.issues[0].message })
    }
    const existingUser = await User.findOne().or([{ email }, { studentId }])

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image,
      studentId
    })
    try {
      await newUser.save()
      return res.status(201).json({ message: 'User created successfully' })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Sign in
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(404).json({ message: 'User email does not exist' })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Wrong password.' })
    }

    return res.status(200).json({ message: 'User signed in successfully' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Sign out
const signOut = async (req, res) => {
  try {
    return res.status(200).json({ message: 'User signed out successfully' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = { signUp, signIn, signOut }
