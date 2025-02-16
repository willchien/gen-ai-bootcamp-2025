const db = require('../config/database');

const StudySession = {
  findAll: async () => {
    try {
      return await new Promise((resolve, reject) => {
        db.all('SELECT * FROM study_sessions ORDER BY created_at DESC', [], (err, rows) => {
          if (err) {
            console.error('Error fetching study sessions:', err);
            return reject(new Error('Database error while fetching study sessions'));
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
        db.get('SELECT * FROM study_sessions WHERE id = ?', [id], (err, row) => {
          if (err) {
            console.error(`Error fetching study session with id ${id}:`, err);
            return reject(new Error(`Database error while fetching study session with id ${id}`));
          }
          resolve(row || null); // Ensure `null` is returned if no session exists
        });
      });
    } catch (error) {
      console.error('Error in findById:', error);
      throw new Error('Database error');
    }
  },

  create: async (session) => {
    try {
      return await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO study_sessions (group_id, study_activity_id) VALUES (?, ?)',
          [session.group_id, session.study_activity_id],
          function (err) {
            if (err) {
              console.error('Error creating study session:', err);
              return reject(new Error('Database error while creating study session'));
            }
            resolve({ id: this.lastID, ...session });
          }
        );
      });
    } catch (error) {
      console.error('Error in create:', error);
      throw new Error('Database error');
    }
  },

  getRecentSessions: async (limit = 5) => {
    try {
      return await new Promise((resolve, reject) => {
        db.all(
          `SELECT ss.*, 
                  COALESCE(g.name, 'Unknown Group') AS group_name, 
                  COUNT(wri.id) AS total_words,
                  COALESCE(SUM(CASE WHEN wri.correct THEN 1 ELSE 0 END), 0) AS correct_words
           FROM study_sessions ss
           LEFT JOIN groups g ON ss.group_id = g.id
           LEFT JOIN word_review_items wri ON ss.id = wri.study_session_id
           GROUP BY ss.id
           ORDER BY ss.created_at DESC
           LIMIT ?`,
          [limit],
          (err, rows) => {
            if (err) {
              console.error('Error fetching recent sessions:', err);
              return reject(new Error('Database error while fetching recent sessions'));
            }
            resolve(rows);
          }
        );
      });
    } catch (error) {
      console.error('Error in getRecentSessions:', error);
      throw new Error('Database error');
    }
  }
};

module.exports = StudySession;