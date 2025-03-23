const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
});

// Obtener un cliente por su ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: 'Cliente no encontrado' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).send({ message: 'Error al crear el cliente', error: error.message });
    }
});

// Actualizar un cliente por su ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) {
            return res.status(404).send({ message: 'Cliente no encontrado' });
        }
        res.json(updatedCustomer);
    } catch (error) {
        res.status(400).send({ message: 'Error al actualizar el cliente', error: error.message });
    }
});

// Eliminar un cliente por su ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).send({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el cliente', error: error.message });
    }
});

module.exports = router;
