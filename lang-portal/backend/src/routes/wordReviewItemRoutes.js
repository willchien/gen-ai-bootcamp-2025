const express = require('express');
const router = express.Router();

// Mock data
const wordReviewItems = [
  {
    id: 1,
    word_id: 1,
    study_session_id: 123,
    correct: true,
    created_at: "2025-02-08T17:20:23-05:00"
  }
];

// GET /api/word-review-items - Get all word review items
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const items_per_page = 100;
  const start = (page - 1) * items_per_page;
  const end = start + items_per_page;
  
  const items = wordReviewItems.slice(start, end);
  
  res.json({
    items,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(wordReviewItems.length / items_per_page),
      total_items: wordReviewItems.length,
      items_per_page
    }
  });
});

// GET /api/word-review-items/:id - Get specific word review item
router.get('/:id', (req, res) => {
  const item = wordReviewItems.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Word review item not found' });
  }
});

// POST /api/word-review-items - Create new word review item
router.post('/', (req, res) => {
  const { word_id, study_session_id, correct } = req.body;
  
  if (!word_id || !study_session_id || correct === undefined) {
    return res.status(400).json({ error: 'Missing required fields: word_id, study_session_id, correct' });
  }
  
  const newItem = {
    id: wordReviewItems.length + 1,
    word_id,
    study_session_id,
    correct,
    created_at: new Date().toISOString()
  };
  
  wordReviewItems.push(newItem);
  res.status(201).json(newItem);
});

// Handle 404 errors for undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = router;