const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Secret key for JWT (should be kept secret in production)
const secretKey = 'your-secret-key';

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Mock user database (for demonstration purposes)
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' }
];

// Simulated in-memory IPO registrations
let ipoRegistrations = [];

// Middleware to verify JWT
function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];  // Extract token from Authorization header
    if (!token) {
        return res.status(403).json({ error: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid Token' });
        }
        req.user = user;  // Store user info from JWT in the request object
        next();  // Proceed to the next middleware or route handler
    });
}

// Route to handle IPO Registration (Requires JWT verification)
app.post('/register-ipo', verifyToken, (req, res) => {
    const { investor_name, investor_email, shares_requested } = req.body;

    if (!investor_name || !investor_email || !shares_requested) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Add registration to in-memory list (In real-world, store in DB)
    const newRegistration = {
        investor_name,
        investor_email,
        shares_requested,
        registration_time: new Date(),
        user_id: req.user.id  // Associating registration with the authenticated user
    };

    ipoRegistrations.push(newRegistration);
    console.log('IPO Registration:', newRegistration);

    res.status(200).json({ message: 'IPO Registration successful.' });
});

// Route to simulate user login and generate JWT (For testing)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, name: user.name }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
