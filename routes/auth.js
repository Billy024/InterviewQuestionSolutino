const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign up route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.status(302).send(error.message);
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(302).send('Invalid username or password');
        }
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.status(302).send(error.message);
    }
});

module.exports = router;
