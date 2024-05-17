const express = require('express')
const recipeModel = require('../models/recipe.js')
const router = express.Router()

async function getRecipe (req, res, next) {
  try {
    const recipe = await recipeModel.findById(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    res.recipe = recipe
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

router.get('/', async (req, res) => {
  try {
    const recipes = await recipeModel.find()
    res.json(recipes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get('/:id', getRecipe, (req, res) => {
  try {
    res.json(res.recipe)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.post('/', async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.ingredients ||
      !req.body.instructions ||
      !req.body.cuisine
    ) {
      return res.status(400).json({
        message: 'Please provide title, ingredients, instructions, and cuisine'
      })
    }
    const existingRecipe = await recipeModel.findOne({
      name: req.body.name
    })
    if (existingRecipe) {
      return res.status(400).json({
        message: 'Recipe already exists'
      })
    }
    const recipe = new recipeModel(req.body)
    const newRecipe = await recipe.save()
    res.status(201).json({ message: 'Recipe created', recipe: newRecipe })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.patch('/:id', getRecipe, async (req, res) => {
  try {
    if (req.body.name != null) {
      res.recipe.name = req.body.name
    }
    const updatedRecipe = await res.recipe.save()
    res.json(updatedRecipe)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.put('/:id', getRecipe, async (req, res) => {
  try {
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedRecipe)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await recipeModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'Recipe deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
module.exports = router
