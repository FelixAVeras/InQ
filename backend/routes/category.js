const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category');
const User = require('../models/user');

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

// Obtener usuarios por categoría
router.get('/:categoryId/users', async (req, res) => {
  console.log('Category ID recibido:', req.params.categoryId);
  
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.categoryId)) {
      return res.status(400).send({ message: 'ID de categoría inválido' });
    }
    
    const users = await User.find({ category: req.params.categoryId });
    res.send(users);
  } catch (err) {
    console.error('Error al obtener usuarios por categoría:', err);
      
    res.status(500).send({
      message: 'Error al obtener usuarios por categoría',
      error: err.message || 'Error desconocido'
    });
  }
});

module.exports = router;