const db = require('../config/database');

const StudyActivity = {
  findAll: async () => {
    try {
      return await new Promise((resolve, reject) => {
        db.all('SELECT * FROM study_activities', [], (err, rows) => {
          if (err) {
            console.error('Error fetching study activities:', err);
            return reject(new Error('Database error while fetching study activities'));
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
        db.get('SELECT * FROM study_activities WHERE id = ?', [id], (err, row) => {
          if (err) {
            console.error(`Error fetching study activity with id ${id}:`, err);
            return reject(new Error(`Database error while fetching study activity with id ${id}`));
          }
          resolve(row || null); // Ensure null is returned if no record exists
        });
      });
    } catch (error) {
      console.error('Error in findById:', error);
      throw new Error('Database error');
    }
  },

  create: async (activity) => {
    try {
      return await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO study_activities (study_session_id, group_id) VALUES (?, ?)',
          [activity.study_session_id, activity.group_id],
          function (err) {
            if (err) {
              console.error('Error creating study activity:', err);
              return reject(new Error('Database error while creating study activity'));
            }
            resolve({ id: this.lastID, ...activity });
          }
        );
      });
    } catch (error) {
      console.error('Error in create:', error);
      throw new Error('Database error');
    }
  },

  findByGroupId: async (groupId) => {
    try {
      return await new Promise((resolve, reject) => {
        db.all(
          'SELECT * FROM study_activities WHERE group_id = ?',
          [groupId],
          (err, rows) => {
            if (err) {
              console.error(`Error fetching study activities for group ${groupId}:`, err);
              return reject(new Error(`Database error while fetching study activities for group ${groupId}`));
            }
            resolve(rows);
          }
        );
      });
    } catch (error) {
      console.error('Error in findByGroupId:', error);
      throw new Error('Database error');
    }
  }
};

module.exports = StudyActivity;