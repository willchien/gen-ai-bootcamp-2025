const db = require('../config/database');

const Word = {
  findAll: async () => {
    try {
      return await new Promise((resolve, reject) => {
        db.all('SELECT * FROM words', [], (err, rows) => {
          if (err) {
            console.error('Error fetching words:', err);
            return reject(new Error('Database error while fetching words'));
          }
          rows.forEach(row => row.parts = JSON.parse(row.parts)); // Convert back to object
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
        db.get('SELECT * FROM words WHERE id = ?', [id], (err, row) => {
          if (err) {
            console.error(`Error fetching word with id ${id}:`, err);
            return reject(new Error('Database error while fetching word'));
          }
          if (row) row.parts = JSON.parse(row.parts); // Convert back to object
          resolve(row);
        });
      });
    } catch (error) {
      console.error('Error in findById:', error);
      throw new Error('Database error');
    }
  },

  create: async (word) => {
    try {
      return await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO words (French, English, parts) VALUES (?, ?, ?)',
          [word.french, word.english, JSON.stringify(word.parts)],
          function(err) {
            if (err) {
              console.error('Error inserting word:', err);
              return reject(new Error('Database error while inserting word'));
            }
            resolve({ id: this.lastID, ...word });
          }
        );
      });
    } catch (error) {
      console.error('Error in create:', error);
      throw new Error('Database error');
    }
  },

  findByGroup: async (groupId) => {
    try {
      return await new Promise((resolve, reject) => {
        db.all(
          `SELECT w.* FROM words w 
           JOIN words_groups wg ON w.id = wg.word_id 
           WHERE wg.group_id = ?`,
          [groupId],
          (err, rows) => {
            if (err) {
              console.error(`Error fetching words for group ${groupId}:`, err);
              return reject(new Error('Database error while fetching words by group'));
            }
            rows.forEach(row => row.parts = JSON.parse(row.parts)); // Convert back to object
            resolve(rows);
          }
        );
      });
    } catch (error) {
      console.error('Error in findByGroup:', error);
      throw new Error('Database error');
    }
  }
};

module.exports = Word;