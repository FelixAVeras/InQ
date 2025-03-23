const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    specialty: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Professional', professionalSchema);