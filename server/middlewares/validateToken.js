const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const validateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decodedToken !== 'string' && 'user' in decodedToken) {
      req.user = { id: decodedToken.user }
    } else {
      return res.status(403).send({ message: 'Forbidden' })
    }
    next()
  } catch (err) {
    return res.status(403).send({ message: 'Forbidden' })
  }
}

module.exports = validateToken
