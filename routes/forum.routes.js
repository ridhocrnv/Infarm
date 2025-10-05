const express = require('express');
const router = express.Router();

router.get('/threads', (req, res) => {
    res.json({ message: 'Get forum threads' });
});

module.exports = router;
