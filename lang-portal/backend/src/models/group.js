const db = require('../config/database');

const Group = {
  findAll: async () => {
    try {
      return await new Promise((resolve, reject) => {
        db.all('SELECT * FROM groups', [], (err, rows) => {
          if (err) {
            console.error('Error fetching groups:', err);
            return reject(new Error('Database error while fetching groups'));
          }
          resolve(rows);
        });
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new Error('Database error');
    }
  },

  findById: async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        db.get('SELECT * FROM groups WHERE id = ?', [id], (err, row) => {
          if (err) {
            console.error(`Error fetching group with id ${id}:`, err);
            return reject(new Error('Database error while fetching group'));
          }
          resolve(row || null); // Ensure it returns null if no group is found
        });
      });
    } catch (error) {
      console.error('Error in findById:', error);
      throw new Error('Database error');
    }
  },

  create: async (group) => {
    try {
      return await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO groups (name) VALUES (?)',
          [group.name],
          function (err) {
            if (err) {
              console.error('Error creating group:', err);
              return reject(new Error('Database error while creating group'));
            }
            resolve({ id: this.lastID, ...group });
          }
        );
      });
    } catch (error) {
      console.error('Error in create:', error);
      throw new Error('Database error');
    }
  },

  getWordsCount: async (groupId) => {
    try {
      return await new Promise((resolve, reject) => {
        db.get(
          `SELECT COUNT(*) as count FROM words_groups WHERE group_id = ?`,
          [groupId],
          (err, row) => {
            if (err) {
              console.error(`Error counting words in group ${groupId}:`, err);
              return reject(new Error('Database error while counting words'));
            }
            resolve(row ? row.count : 0); // Return 0 if no words are found
          }
        );
      });
    } catch (error) {
      console.error('Error in getWordsCount:', error);
      throw new Error('Database error');
    }
  }
};

module.exports = Group;