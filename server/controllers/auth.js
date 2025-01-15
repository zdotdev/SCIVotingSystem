const User = require('../models/user.js')
const UserZodSchema = require('../zod/user.js')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const {
  generateAccessToken,
  generateRefreshToken
} = require('../middlewares/auth.js')
const jwt = require('jsonwebtoken')

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

    const accessToken = await generateAccessToken({ id: newUser._id })
    const refreshToken = await generateRefreshToken({
      id: newUser._id,
      email: newUser.email
    })

    newUser.refreshToken = refreshToken

    try {
      await newUser.save()

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })

      return res
        .status(201)
        .json({ message: 'User created successfully', user: newUser.role })
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

    const parserBody = UserZodSchema.pick({
      email: true,
      password: true
    }).safeParse(req.body)

    if (!parserBody.success) {
      return res
        .status(422)
        .json({ message: parserBody.error.issues[0].message })
    }

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

    const accessToken = await generateAccessToken({ id: existingUser._id })
    const refreshToken = await generateRefreshToken({
      id: existingUser._id,
      email: existingUser.email
    })

    existingUser.refreshToken = refreshToken
    await existingUser.save()

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    return res
      .status(200)
      .json({ message: 'User signed in successfully', user: existingUser.role })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Sign out
const signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' })
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const id = decoded.id.id

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    const user = await User.findById(id)
    if (user) {
      user.refreshToken = null
      await user.save()
    } else {
      return res.status(403).json({ message: 'Forbidden' })
    }

    return res.status(200).json({ message: 'User signed out successfully' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const loginWithRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }

    const accessToken = await generateAccessToken({ id: user._id })

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    return res.status(200).json({
      message: 'Token refreshed successfully',
      user: user.role
    })
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Invalid or expired refresh token' })
  }
}

const idGetter = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }
    return res
      .status(200)
      .json({ message: 'User ID retrieved successfully', user: user._id })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = { signUp, signIn, signOut, loginWithRefreshToken, idGetter }
