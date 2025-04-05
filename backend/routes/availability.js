const express = require('express');
const router = express.Router();
const Availability = require('../models/availability');
const { isAuthenticated } = require('../middleware/isAuthenticated');

// Obtener disponibilidad del profesional
// router.get('/', async (req, res) => {
//   try {
//     const availability = await Availability.find({ professionalId: req.user._id });
//     res.json(availability);
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener disponibilidad.' });
//   }
// });

// Crear o actualizar un día
router.post('/', async (req, res) => {
  const { weekday, timeRanges } = req.body;
  
  if (!weekday || !timeRanges || timeRanges.length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar el día y los rangos de tiempo.' });
  }

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
router.delete('/:weekday', async (req, res) => {
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

// Ruta para obtener disponibilidad
router.get('/', isAuthenticated, async (req, res) => {
  try {
      const availability = await Availability.find({ professionalId: req.user._id });
      res.json(availability);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Ruta para guardar disponibilidad
router.post('/', isAuthenticated, async (req, res) => {
  const { weekday, timeRanges } = req.body;
  
  // Verifica los datos que llegan
  console.log('Datos recibidos:', req.body);
  console.log('User ID:', req.user._id);  // Verifica el ID del profesional en la solicitud
  
  if (!weekday || !timeRanges || timeRanges.length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar el día y los rangos de tiempo.' });
  }

  try {
    const updated = await Availability.findOneAndUpdate(
      { professionalId: req.user._id, weekday },
      { timeRanges },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Error al guardar disponibilidad:', err);
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
