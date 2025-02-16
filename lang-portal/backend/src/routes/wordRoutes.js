const express = require('express');
const router = express.Router();

// Mock database
let words = [
  { id: 1, french: 'bonjour', english: 'hello', correct_count: 5, wrong_count: 2, groups: [{ id: 1, name: 'Basic Greetings' }] },
  { id: 2, french: 'merci', english: 'thank you', correct_count: 3, wrong_count: 1, groups: [{ id: 1, name: 'Basic Greetings' }] }
];

// GET /api/words - Retrieve all words with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const sort_by = req.query.sort_by || 'french';
  const order = req.query.order || 'asc';
  const items_per_page = 100;

  // Mock pagination
  const start = (page - 1) * items_per_page;
  const end = start + items_per_page;
  const items = words.slice(start, end).map(word => ({
    french: word.french,
    english: word.english,
    correct_count: word.correct_count,
    wrong_count: word.wrong_count
  }));

  res.json({
    items,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(words.length / items_per_page),
      total_items: words.length,
      items_per_page
    }
  });
});

// GET /api/words/:id - Retrieve a specific word by ID with stats
router.get('/:id', (req, res) => {
  const word = words.find(w => w.id === parseInt(req.params.id));
  if (word) {
    res.json({
      french: word.french,
      english: word.english,
      stats: {
        correct_count: word.correct_count,
        wrong_count: word.wrong_count
      },
      groups: word.groups
    });
  } else {
    res.status(404).send('Word not found');
  }
});

// POST /api/words - Add a new word
router.post('/', (req, res) => {
  const { french, english } = req.body;
  
  if (!french || !english) {
    return res.status(400).json({ error: 'French and English translations are required' });
  }
  
  const newWord = {
    id: words.length + 1,
    french,
    english,
    correct_count: 0,
    wrong_count: 0,
    groups: req.body.groups || []
  };
  
  words.push(newWord);
  res.status(201).json(newWord);
});

// PUT /api/words/:id - Update an existing word
router.put('/:id', (req, res) => {
  const word = words.find(w => w.id === parseInt(req.params.id));
  if (word) {
    word.french = req.body.french;
    word.english = req.body.english;
    word.correct_count = req.body.correct_count;
    word.wrong_count = req.body.wrong_count;
    word.groups = req.body.groups;
    res.json(word);
  } else {
    res.status(404).send('Word not found');
  }
});

// DELETE /api/words/:id - Delete a word
router.delete('/:id', (req, res) => {
  const wordIndex = words.findIndex(w => w.id === parseInt(req.params.id));
  if (wordIndex !== -1) {
    words.splice(wordIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Word not found');
  }
});

module.exports = router;