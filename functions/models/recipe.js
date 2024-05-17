const mongoose = require('mongoose')
const recipeSchema = require('../schema/recipe.js')

const recipeModel = mongoose.model('Recipe', recipeSchema)

module.exports = recipeModel
