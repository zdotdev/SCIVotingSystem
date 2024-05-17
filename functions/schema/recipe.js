const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  }
})
module.exports = recipeSchema
