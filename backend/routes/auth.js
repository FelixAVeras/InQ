const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Registrar un usuario
router.post('/register', async (req, res) => {
    try {
        const { username, password, role, email, fullname } = req.body;

        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('El usuario ya existe');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword,
            role,
            email
        });

        await user.save();

        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).send('Usuario no encontrado');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).send('Credenciales incorrectas');
        }

        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.send({ 
            token, 
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;