const express = require('express');
const router = express.Router();
const Professional = require('../models/professional');

// Obtener todos los profesionales
router.get('/', async (req, res) => {
    try {
        const professionals = await Professional.find();
        res.json(professionals);
    } catch (error) {
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
});

// Obtener un profesional por su ID
router.get('/:id', async (req, res) => {
    try {
        const professional = await Professional.findById(req.params.id);
        if (!professional) {
            return res.status(404).send({ message: 'Profesional no encontrado' });
        }
        res.json(professional);
    } catch (error) {
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
});

// Crear un nuevo profesional
router.post('/', async (req, res) => {
    try {
        const newProfessional = new Professional(req.body);
        await newProfessional.save();
        res.status(201).json(newProfessional);
    } catch (error) {
        res.status(400).send({ message: 'Error al crear el profesional', error: error.message });
    }
});

// Actualizar un profesional por su ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfessional) {
            return res.status(404).send({ message: 'Profesional no encontrado' });
        }
        res.json(updatedProfessional);
    } catch (error) {
        res.status(400).send({ message: 'Error al actualizar el profesional', error: error.message });
    }
});

// Eliminar un profesional por su ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProfessional = await Professional.findByIdAndDelete(req.params.id);
        if (!deletedProfessional) {
            return res.status(404).send({ message: 'Profesional no encontrado' });
        }
        res.json({ message: 'Profesional eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el profesional', error: error.message });
    }
});

module.exports = router;
