const express = require('express');
const router = express.Router();

// GET /system/health - Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;