const express = require('express');
const router = express.Router();

// Mock database
let words = [
  { id: 1, French: 'Bonjour', English: 'Hello', parts: { noun: true } },
  { id: 2, French: 'Merci', English: 'Thank you', parts: { noun: true } }
];

// GET /words - Retrieve all words
router.get('/', (req, res) => {
  res.json(words);
});

// GET /words/:id - Retrieve a specific word by ID
router.get('/:id', (req, res) => {
  const word = words.find(w => w.id === parseInt(req.params.id));
  if (word) {
    res.json(word);
  } else {
    res.status(404).send('Word not found');
  }
});

// POST /words - Add a new word
router.post('/', (req, res) => {
  const newWord = {
    id: words.length + 1,
    French: req.body.French,
    English: req.body.English,
    parts: req.body.parts
  };
  words.push(newWord);
  res.status(201).json(newWord);
});

// PUT /words/:id - Update an existing word
router.put('/:id', (req, res) => {
  const word = words.find(w => w.id === parseInt(req.params.id));
  if (word) {
    word.French = req.body.French;
    word.English = req.body.English;
    word.parts = req.body.parts;
    res.json(word);
  } else {
    res.status(404).send('Word not found');
  }
});

// DELETE /words/:id - Delete a word
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