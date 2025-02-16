const express = require('express');
const router = express.Router();
const WordReviewItemController = require('../controllers/wordReviewItemController');

// GET /api/word-review-items
router.get('/', WordReviewItemController.getAll);

// GET /api/word-review-items/:id
router.get('/:id', WordReviewItemController.getById);

// POST /api/word-review-items
router.post('/', (req, res, next) => {
  const { word_id, study_session_id, correct } = req.body;
  if (!word_id || !study_session_id || correct === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: word_id, study_session_id, correct'
    });
  }
  next();
}, WordReviewItemController.create);

// DELETE /api/word-review-items/:id
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
  next();
}, WordReviewItemController.delete);

// Handle 404 errors for undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = router;