const express = require('express')
const serverless = require('serverless-http')
const router = require('./routes/recipe.js')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const db = `mongodb+srv://Admin:admin@serveless-api-ragas.yrw2h8l.mongodb.net/?retryWrites=true&w=majority&appName=serveless-api-ragas`

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(db)
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('Error:', err)
  })
app.listen(3000, () => {
  console.log('Server is running')
})
app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)
