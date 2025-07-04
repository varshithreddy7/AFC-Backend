const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.json({ 
    status: 'Restaurant server is running!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;