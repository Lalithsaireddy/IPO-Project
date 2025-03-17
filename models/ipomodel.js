const mongoose = require('mongoose');

// Define schema for the IPO Registration model
const ipoRegistrationSchema = new mongoose.Schema({
    investor_name: { type: String, required: true },
    investor_email: { type: String, required: true },
    shares_requested: { type: Number, required: true },
    registration_time: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
});

// Create and export the IPO Registration model
const IPORegistration = mongoose.model('IPORegistration', ipoRegistrationSchema);
module.exports = IPORegistration;
