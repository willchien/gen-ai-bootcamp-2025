const StudySession = require('../models/studySession');

const StudySessionController = {
  async getAll(req, res) {
    try {
      const sessions = await StudySession.findAll();
      res.json({ success: true, data: sessions });
    } catch (error) {
      console.error('Controller error in getAll:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch study sessions' });
    }
  },

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
      }

      const session = await StudySession.findById(id);
      if (!session) {
        return res.status(404).json({ success: false, error: 'Study session not found' });
      }

      res.json({ success: true, data: session });
    } catch (error) {
      console.error('Controller error in getById:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch study session' });
    }
  },

  async create(req, res) {
    try {
      const { group_id, study_activity_id } = req.body;

      if (!group_id || !study_activity_id) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: group_id, study_activity_id' 
        });
      }

      // Ensure both group_id and study_activity_id are numbers
      if (isNaN(group_id) || isNaN(study_activity_id)) {
        return res.status(400).json({ 
          success: false, 
          error: 'group_id and study_activity_id must be valid numbers' 
        });
      }

      const newSession = await StudySession.create({ group_id, study_activity_id });
      res.status(201).json({ success: true, data: newSession });
    } catch (error) {
      console.error('Controller error in create:', error);
      res.status(500).json({ success: false, error: 'Failed to create study session' });
    }
  },

  async getRecentSessions(req, res) {
    try {
      const limit = parseInt(req.query.limit, 10) || 5;

      // Ensure limit is a valid number and greater than 0
      if (isNaN(limit) || limit < 1) {
        return res.status(400).json({ success: false, error: 'Invalid limit parameter. Must be a positive number.' });
      }

      const sessions = await StudySession.getRecentSessions(limit);
      res.json({ success: true, data: sessions });
    } catch (error) {
      console.error('Controller error in getRecentSessions:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch recent sessions' });
    }
  }
};

module.exports = StudySessionController;