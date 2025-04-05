const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Verifica si la variable JWT_SECRET está correctamente cargada
if (!process.env.JWT_SECRET) {
    console.error('La clave secreta JWT no está definida en las variables de entorno');
    process.exit(1);  // Termina la ejecución si la clave secreta no está definida
}

// Registrar un usuario
router.post('/register', async (req, res) => {
    try {
        const { fullname, password, role, email, category } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('El usuario ya existe');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            fullname,
            password: hashedPassword,
            role,
            email,
            category
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
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        
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
                email: user.email,
                role: user.role
            } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;
