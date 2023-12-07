const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config('../.env');


// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { email, password, username, name } = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            name,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by username

        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If username and password are correct, generate tokens
        const accessToken = generateAccessToken({ name: user.name });
        const refreshToken = jwt.sign({ name: user.name }, "refresh_token");

        res.send({ data: { accessToken, refreshToken } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, 'access_token', { expiresIn: '30000s' })
}

module.exports = router;