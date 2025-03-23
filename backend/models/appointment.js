const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    professional: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
    date: { type: Date, required: true },
    hour: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Confirm', 'Cancelled'], default: 'Pending' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);