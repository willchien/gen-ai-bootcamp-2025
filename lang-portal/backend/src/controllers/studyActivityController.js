const StudyActivity = require('../models/studyActivity');

const StudyActivityController = {
  async getAll(req, res) {
    try {
      const activities = await StudyActivity.findAll();
      res.json({ success: true, data: activities });
    } catch (error) {
      console.error('Controller error in getAll:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch study activities' });
    }
  },

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
      }

      const activity = await StudyActivity.findById(id);
      if (!activity) {
        return res.status(404).json({ success: false, error: 'Study activity not found' });
      }

      res.json({ success: true, data: activity });
    } catch (error) {
      console.error('Controller error in getById:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch study activity' });
    }
  },

  async create(req, res) {
    try {
      const { study_session_id, group_id } = req.body;

      if (!study_session_id || !group_id) {
        return res.status(400).json({ success: false, error: 'Missing required fields: study_session_id, group_id' });
      }

      // Ensure that study_session_id and group_id are numbers
      if (isNaN(study_session_id) || isNaN(group_id)) {
        return res.status(400).json({ success: false, error: 'study_session_id and group_id must be valid numbers' });
      }

      const newActivity = await StudyActivity.create({ study_session_id, group_id });
      res.status(201).json({ success: true, data: newActivity });
    } catch (error) {
      console.error('Controller error in create:', error);
      res.status(500).json({ success: false, error: 'Failed to create study activity' });
    }
  },

  async getByGroup(req, res) {
    try {
      const groupId = parseInt(req.params.groupId, 10);
      if (isNaN(groupId)) {
        return res.status(400).json({ success: false, error: 'Invalid group ID format' });
      }

      const activities = await StudyActivity.findByGroupId(groupId);
      if (!activities || activities.length === 0) {
        return res.status(404).json({ success: false, error: 'No study activities found for this group' });
      }

      res.json({ success: true, data: activities });
    } catch (error) {
      console.error('Controller error in getByGroup:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch study activities for group' });
    }
  }
};

module.exports = StudyActivityController;