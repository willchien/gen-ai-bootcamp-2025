const express = require('express');
const router = express.Router();

// Mock data
const studyActivities = [
  {
    id: 1,
    name: "Vocabulary Quiz",
    thumbnail_url: "https://example.com/thumbnail.jpg",
    description: "Practice your vocabulary with flashcards"
  }
];

const studySessions = [
  {
    id: 123,
    activity_name: "Vocabulary Quiz",
    group_name: "Basic Greetings",
    start_time: "2025-02-08T17:20:23-05:00",
    end_time: "2025-02-08T17:30:23-05:00",
    review_items_count: 20
  }
];

// GET /api/study-activities/:id - Get study activity by ID
router.get('/:id', (req, res) => {
  const activity = studyActivities.find(a => a.id === parseInt(req.params.id));
  if (activity) {
    res.json(activity);
  } else {
    res.status(404).json({ error: 'Study activity not found' });
  }
});

// GET /api/study-activities/:id/study-sessions - Get study sessions for activity
router.get('/:id/study-sessions', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const items_per_page = 20;
  const start = (page - 1) * items_per_page;
  const end = start + items_per_page;
  
  const items = studySessions.slice(start, end);
  
  res.json({
    items,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(studySessions.length / items_per_page),
      total_items: studySessions.length,
      items_per_page
    }
  });
});

// POST /api/study-activities - Create new study activity
router.post('/', (req, res) => {
  const { group_id, study_activity_id } = req.body;
  
  if (!group_id || !study_activity_id) {
    return res.status(400).json({ error: 'group_id and study_activity_id are required' });
  }
  
  const newActivity = {
    id: studyActivities.length + 1,
    group_id
  };
  
  res.status(201).json(newActivity);
});

module.exports = router;