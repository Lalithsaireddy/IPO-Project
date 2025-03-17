const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const IPORegistration = require('../models/ipomodel');
const secretKey = 'your-secret-key';  // Replace with a more secure secret key in production

// Controller for handling IPO Registration
async function registerIPO(req, res) {
    const { investor_name, investor_email, shares_requested } = req.body;

    if (!investor_name || !investor_email || !shares_requested) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Create a new IPO registration
        const newRegistration = new IPORegistration({
            investor_name,
            investor_email,
            shares_requested,
            user_id: req.user.id,  // Associate the registration with the authenticated user
        });

        // Save the registration to the database
        await newRegistration.save();

        res.status(200).json({ message: 'IPO Registration successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
}

// Controller for handling user login and generating JWT
async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Compare passwords (assuming passwords are hashed in the database)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, name: user.name }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
}

module.exports = { registerIPO, login };
