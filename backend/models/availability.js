const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekday: { type: Number, required: true }, // 0 = Domingo, 1 = Lunes, etc.
  timeRanges: [{
    from: { type: String, required: true }, // formato "09:00"
    to: { type: String, required: true }
  }]
});

availabilitySchema.index({ professionalId: 1, weekday: 1 }, { unique: true });

module.exports = mongoose.model('Availability', availabilitySchema);