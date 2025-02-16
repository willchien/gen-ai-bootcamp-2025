const express = require('express');
const router = express.Router();

// GET /dashboard/last_study_session - Get last study session info
router.get('/last_study_session', (req, res) => {
  res.json({
    id: 123,
    group_id: 456,
    created_at: new Date().toISOString(),
    study_activity_id: 789,
    group_name: "Basic Greetings"
  });
});

// GET /dashboard/study_progress - Get study progress
router.get('/study_progress', (req, res) => {
  res.json({
    total_words_studied: 3,
    total_available_words: 124
  });
});

// GET /dashboard/quick_stats - Get quick overview stats
router.get('/quick_stats', (req, res) => {
  res.json({
    success_rate: 80.0,
    total_study_sessions: 4,
    total_active_groups: 3,
    study_streak_days: 4
  });
});

// GET /dashboard/stats - Get dashboard statistics
router.get('/stats', (req, res) => {
  res.json({
    totalWords: 0,
    wordsLearned: 0,
    wordsToReview: 0,
    lastStudySession: null
  });
});

module.exports = router;