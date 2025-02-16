const db = require('../config/database');

const WordReviewItem = {
  findAll: async () => {
    try {
      return await new Promise((resolve, reject) => {
        db.all(
          'SELECT * FROM word_review_items ORDER BY created_at DESC',
          [],
          (err, rows) => {
            if (err) {
              console.error('Error fetching word review items:', err);
              return reject(new Error('Database error while fetching word review items'));
            }
            resolve(rows);
          }
        );
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new Error('Database error');
    }
  },

  findById: async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        db.get(
          'SELECT * FROM word_review_items WHERE id = ?',
          [id],
          (err, row) => {
            if (err) {
              console.error(`Error fetching word review item with id ${id}:`, err);
              return reject(new Error(`Database error while fetching word review item ${id}`));
            }
            resolve(row || null); // Ensuring `null` is returned if not found
          }
        );
      });
    } catch (error) {
      console.error('Error in findById:', error);
      throw new Error('Database error');
    }
  },

  create: async (review) => {
    try {
      return await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO word_review_items (word_id, study_session_id, correct) VALUES (?, ?, ?)',
          [review.word_id, review.study_session_id, review.correct],
          function (err) {
            if (err) {
              console.error('Error creating word review item:', err);
              return reject(new Error('Database error while creating word review item'));
            }
            resolve({ id: this.lastID, ...review });
          }
        );
      });
    } catch (error) {
      console.error('Error in create:', error);
      throw new Error('Database error');
    }
  },

  delete: async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        db.run(
          'DELETE FROM word_review_items WHERE id = ?',
          [id],
          function (err) {
            if (err) {
              console.error(`Error deleting word review item with id ${id}:`, err);
              return reject(new Error(`Database error while deleting word review item ${id}`));
            }
            resolve(this.changes > 0); // Returns `true` if a row was deleted, `false` otherwise
          }
        );
      });
    } catch (error) {
      console.error('Error in delete:', error);
      throw new Error('Database error');
    }
  }
};

module.exports = WordReviewItem;