const express = require('express');
const router = express.Router();

// Mock data
const studySessions = [
  {
    id: 1,
    group_id: 456,
    study_activity_id: 789,
    created_at: "2025-02-08T17:20:23-05:00",
    group_name: "Basic Greetings",
    review_items_count: 20,
    start_time: "2025-02-08T17:20:23-05:00",
    end_time: "2025-02-08T17:30:23-05:00"
  }
];

// GET /api/study-sessions - Get all study sessions with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const items_per_page = 100;
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

// GET /api/study-sessions/recent - Get most recent study session
router.get('/recent', (req, res) => {
  const recentSession = studySessions[studySessions.length - 1];
  if (recentSession) {
    res.json({
      id: recentSession.id,
      group_id: recentSession.group_id,
      created_at: recentSession.created_at,
      study_activity_id: recentSession.study_activity_id,
      group_name: recentSession.group_name
    });
  } else {
    res.status(404).json({ error: 'No study sessions found' });
  }
});

// GET /api/study-sessions/:id - Get specific study session
router.get('/:id', (req, res) => {
  const session = studySessions.find(s => s.id === parseInt(req.params.id));
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ error: 'Study session not found' });
  }
});

// POST /api/study-sessions - Create new study session
router.post('/', (req, res) => {
  const { group_id, study_activity_id } = req.body;
  
  if (!group_id || !study_activity_id) {
    return res.status(400).json({ error: 'group_id and study_activity_id are required' });
  }
  
  const newSession = {
    id: studySessions.length + 1,
    group_id,
    study_activity_id,
    created_at: new Date().toISOString(),
    group_name: "Basic Greetings", // This would normally come from the database
    review_items_count: 0,
    start_time: new Date().toISOString(),
    end_time: null
  };
  
  studySessions.push(newSession);
  res.status(201).json(newSession);
});

// Optional: Handle 404 errors for undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = router;