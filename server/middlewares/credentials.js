const { allowedOrigins } = require('../configs/allowedOrigins.js')

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  next()
}

module.exports = { credentials }
