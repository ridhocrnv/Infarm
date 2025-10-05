const express = require('express');
const router = express.Router();

// Temporary route untuk testing
router.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint' });
});

router.post('/login', (req, res) => {
    res.json({ message: 'Login endpoint' });
});

module.exports = router; // PENTING: Jangan lupa ini!
