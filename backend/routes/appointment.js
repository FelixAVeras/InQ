const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// Get all appointments
router.get('/', async(request, response) => {
    try {
        // const appointments = await Appointment.find().populate('customer').populate('professional');
        const appointments = await Appointment.find();

        response.send(appointments);
    } catch (error) {
        response.status(500).send(error)
    }
});

// Save an Appointment
router.post('/', async(request, response) => {
    try {
        const appointment = new Appointment(request.body);

        await appointment.save();

        response.status(201).send(appointment);
    } catch (error) {
        response.status(400).send(error)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const db = req.dbClient.db('inqdb');
        const appointment = await db.collection('appointments').findOne({ _id: new ObjectId(req.params.id) });
        
        if (!appointment) {
            return res.status(404).send('Cita no encontrada');
        }

        res.send(appointment);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const db = req.dbClient.db('inqdb');
        const result = await db.collection('appointments').updateOne(
        { 
            _id: new ObjectId(req.params.id) 
        },
        { 
            $set: req.body 
        });
        
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Eliminar una cita por ID
router.delete('/:id', async (req, res) => {
    try {
        const db = req.dbClient.db('inqdb');
        const result = await db.collection('appointments').deleteOne({ _id: new ObjectId(req.params.id) });
        
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;