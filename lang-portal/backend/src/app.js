const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const wordReviewItemRoutes = require('./routes/wordReviewItemRoutes');
const studySessionRoutes = require('./routes/studySessionRoutes');
const studyActivityRoutes = require('./routes/studyActivityRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/word-review-items', wordReviewItemRoutes);
app.use('/api/study-sessions', studySessionRoutes);
app.use('/api/study-activities', studyActivityRoutes);
app.use('/api/groups', groupRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!' 
  });
});

// Handle 404s for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = app;