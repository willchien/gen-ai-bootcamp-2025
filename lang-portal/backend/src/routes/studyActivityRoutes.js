const express = require('express');
const router = express.Router();
const StudyActivityController = require('../controllers/studyActivityController');

// Validation middleware for POST /api/study-activities
const validateStudyActivity = (req, res, next) => {
  const { study_session_id, group_id } = req.body;
  if (!study_session_id || !group_id) {
    return res.status(400).json({
      success: false,
      message: 'study_session_id and group_id are required'
    });
  }
  next();
};

// GET /api/study-activities
router.get('/', StudyActivityController.getAll);

// GET /api/study-activities/:id
router.get('/:id', StudyActivityController.getById);

// POST /api/study-activities
router.post('/', validateStudyActivity, StudyActivityController.create);

// GET /api/study-activities/group/:groupId
router.get('/group/:groupId', StudyActivityController.getByGroup);

// Handle 404 errors for undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = router;