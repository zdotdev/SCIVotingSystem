const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const ServerlessHttp = require('serverless-http')

const app = express()
dotenv.config()

const { credentials } = require('./middlewares/credentials.js')
const { corsOptions } = require('./configs/corsOptions.js')
const { globalErrorHandler } = require('./utils/error.js')

const userRoutes = require('./routes/user.js')

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(cookieParser())

app.use(credentials)
app.use(cors(corsOptions))
app.use(globalErrorHandler)

// routes
app.use('/api/user', userRoutes)

// mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log(err))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

module.exports = ServerlessHttp(app)
