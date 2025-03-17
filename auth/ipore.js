const express = require('express');
const router = express.Router();
const IPO = require('../models/IPO');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, async (req, res) => {
  const { companyName, date, price } = req.body;
  try {
    const ipo = new IPO({ companyName, date, price });
    await ipo.save();
    res.status(201).json({ message: 'IPO registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering IPO' });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const ipos = await IPO.find({});
    res.json(ipos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching IPOs' });
  }
});

module.exports = router;
