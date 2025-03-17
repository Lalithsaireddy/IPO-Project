const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Import the middleware
const ipoController = require('../controllers/ipoController');

// Route to handle IPO Registration (Requires JWT verification)
router.post('/register-ipo', verifyToken, ipoController.registerIPO);

// Route to simulate user login and generate JWT
router.post('/login', ipoController.login);

module.exports = router;
