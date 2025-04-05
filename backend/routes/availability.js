const express = require('express');
const router = express.Router();
const Availability = require('../models/availability');
// const { isAuthenticated } = require('../middlewares/auth');
// const { isProfessional } = require('../middlewares/roles');

// Obtener disponibilidad del profesional autenticado
router.get('/', isAuthenticated, isProfessional, async (req, res) => {
  const availability = await Availability.find({ professionalId: req.user._id });
  res.json(availability);
});

// Crear o actualizar un día
router.post('/', isAuthenticated, isProfessional, async (req, res) => {
  const { weekday, timeRanges } = req.body;
  try {
    const updated = await Availability.findOneAndUpdate(
      { professionalId: req.user._id, weekday },
      { timeRanges },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un día
router.delete('/:weekday', isAuthenticated, isProfessional, async (req, res) => {
  try {
    await Availability.findOneAndDelete({
      professionalId: req.user._id,
      weekday: req.params.weekday
    });
    res.json({ message: 'Disponibilidad eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
