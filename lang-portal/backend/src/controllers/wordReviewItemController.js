const WordReviewItem = require('../models/wordReviewItem');

const WordReviewItemController = {
  async getAll(req, res) {
    try {
      const items = await WordReviewItem.findAll();
      res.json({ success: true, data: items });
    } catch (error) {
      console.error('Controller error in getAll:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch word review items' });
    }
  },

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
      }

      const item = await WordReviewItem.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Word review item not found' });
      }

      res.json({ success: true, data: item });
    } catch (error) {
      console.error('Controller error in getById:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch word review item' });
    }
  },

  async create(req, res) {
    try {
      const { word_id, study_session_id, correct } = req.body;

      if (!word_id || !study_session_id || correct === undefined) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      if (typeof correct !== 'boolean') {
        return res.status(400).json({ success: false, error: '`correct` must be a boolean value' });
      }

      const newItem = await WordReviewItem.create({ word_id, study_session_id, correct });
      res.status(201).json({ success: true, data: newItem });
    } catch (error) {
      console.error('Controller error in create:', error);
      res.status(500).json({ success: false, error: 'Failed to create word review item' });
    }
  },

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
      }

      const deleted = await WordReviewItem.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Word review item not found' });
      }

      res.json({ success: true, message: 'Word review item deleted successfully' });
    } catch (error) {
      console.error('Controller error in delete:', error);
      res.status(500).json({ success: false, error: 'Failed to delete word review item' });
    }
  }
};

module.exports = WordReviewItemController;