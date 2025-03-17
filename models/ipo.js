const mongoose = require('mongoose');

const IPOSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('IPO', IPOSchema);
