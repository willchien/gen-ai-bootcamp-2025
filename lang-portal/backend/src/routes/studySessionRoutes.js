const express = require('express');
const router = express.Router();
const StudySessionController = require('../controllers/studySessionController');

// GET /api/study-sessions
router.get('/', StudySessionController.getAll);

// GET /api/study-sessions/recent
router.get('/recent', StudySessionController.getRecentSessions);

// GET /api/study-sessions/:id
router.get('/:id', StudySessionController.getById);

// POST /api/study-sessions
router.post('/', StudySessionController.create);

// Optional: Handle 404 errors for undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = router;