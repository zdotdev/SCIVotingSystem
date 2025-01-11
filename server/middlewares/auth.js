const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const generateAcessToken = async id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '20h' })
}

const generateRefreshToken = async (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET)
}

module.exports = { generateAcessToken, generateRefreshToken }
