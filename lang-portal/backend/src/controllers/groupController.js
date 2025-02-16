const Group = require('../models/group');

const GroupController = {
  async getAll(req, res) {
    try {
      const groups = await Group.findAll();
      res.json({ success: true, data: groups });
    } catch (error) {
      console.error('Controller error in getAll:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch groups' });
    }
  },

  async getById(req, res) {
    try {
      const group = await Group.findById(req.params.id);
      if (!group) {
        return res.status(404).json({ 
          success: false, 
          error: 'Group not found' 
        });
      }
      const wordsCount = await Group.getWordsCount(req.params.id);
      res.json({ 
        success: true, 
        data: { ...group, words_count: wordsCount } 
      });
    } catch (error) {
      console.error('Controller error in getById:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch group' });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ 
          success: false, 
          error: 'Group name is required' 
        });
      }

      const newGroup = await Group.create({ name });
      res.status(201).json({ success: true, data: newGroup });
    } catch (error) {
      console.error('Controller error in create:', error);
      res.status(500).json({ success: false, error: 'Failed to create group' });
    }
  }
};

module.exports = GroupController;