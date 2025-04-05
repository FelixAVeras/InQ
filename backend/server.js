const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Imports routes
const authRouter = require('./routes/auth');
const appointmentsRouter = require('./routes/appointment');
const categoriesRouter = require('./routes/category');
const availabilityRouter = require('./routes/availability');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// URL de conexión a MongoDB Atlas
const urlAtlas = 'mongodb+srv://fcarvajal44:ef17Uo91TyhEgGSX@inqcluster.rr5v8.mongodb.net/inqdb?retryWrites=true&w=majority&appName=inqcluster';

// Conectar a MongoDB usando mongoose
mongoose.connect(urlAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Conectado a MongoDB Atlas');

    // Iniciar el servidor solo si la conexión fue exitosa
    app.listen(port, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
    });
}).catch(error => {
    console.error('❌ Error de conexión a MongoDB:', error);
});

// Usar las rutas de las citas
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/availability', availabilityRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Recurso no encontrado');
});

// Manejo de errores 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});
