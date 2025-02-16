const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');

// GET /api/groups
router.get('/', GroupController.getAll);

// GET /api/groups/:id
router.get('/:id', GroupController.getById);

// POST /api/groups
router.post('/', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Group name is required'
    });
  }
  next();
}, GroupController.create);

// Handle 404 errors for undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = router;