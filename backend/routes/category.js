const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    // const categories = await Category.find();
    const categories = await Category.find().populate('parentCategory');
    res.send(categories);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:parentId/subcategories', async (req, res) => {
  try {
    const subcategories = await Category.find({ parentCategory: req.params.parentId });
    res.send(subcategories);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;