const express = require('express');
const router = express.Router();

// Mock data
const groups = [
  {
    id: 1,
    name: "Basic Greetings",
    stats: {
      total_word_count: 20,
      words_studied: 15,
      success_rate: 80.5
    }
  },
  {
    id: 2,
    name: "Colors",
    stats: {
      total_word_count: 15,
      words_studied: 10,
      success_rate: 75.0
    }
  }
];

// GET /api/groups - Get paginated list of groups with word counts
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const items_per_page = 100;
  const start = (page - 1) * items_per_page;
  const end = start + items_per_page;
  
  const items = groups.slice(start, end).map(group => ({
    id: group.id,
    name: group.name,
    stats: {
      total_word_count: group.stats.total_word_count
    }
  }));
  
  res.json({
    items,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(groups.length / items_per_page),
      total_items: groups.length,
      items_per_page
    }
  });
});

// GET /api/groups/:id - Get specific group with detailed stats
router.get('/:id', (req, res) => {
  const group = groups.find(g => g.id === parseInt(req.params.id));
  if (group) {
    res.json(group);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
});

// POST /api/groups - Create new group
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Group name is required' });
  }
  
  const newGroup = {
    id: groups.length + 1,
    name,
    stats: {
      total_word_count: 0,
      words_studied: 0,
      success_rate: 0
    }
  };
  
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// Handle 404 errors for undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = router;