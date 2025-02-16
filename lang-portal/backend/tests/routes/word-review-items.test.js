const request = require('supertest');
const app = require('../../src/app');

describe('Word Review Items Routes', () => {
  describe('GET /api/word-review-items', () => {
    it('should return paginated list of word review items', async () => {
      const res = await request(app)
        .get('/api/word-review-items')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('items');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.items)).toBe(true);
      
      if (res.body.items.length > 0) {
        expect(res.body.items[0]).toHaveProperty('id');
        expect(res.body.items[0]).toHaveProperty('word_id');
        expect(res.body.items[0]).toHaveProperty('study_session_id');
        expect(res.body.items[0]).toHaveProperty('correct');
        expect(res.body.items[0]).toHaveProperty('created_at');
      }
    });
  });

  describe('GET /api/word-review-items/:id', () => {
    it('should return a specific word review item', async () => {
      const res = await request(app)
        .get('/api/word-review-items/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('word_id');
      expect(res.body).toHaveProperty('study_session_id');
      expect(res.body).toHaveProperty('correct');
      expect(res.body).toHaveProperty('created_at');
    });

    it('should return 404 for non-existent review item', async () => {
      await request(app)
        .get('/api/word-review-items/999999')
        .expect(404);
    });
  });

  describe('POST /api/word-review-items', () => {
    it('should create a new word review item', async () => {
      const newReviewItem = {
        word_id: 1,
        study_session_id: 1,
        correct: true
      };

      const res = await request(app)
        .post('/api/word-review-items')
        .send(newReviewItem)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.word_id).toBe(newReviewItem.word_id);
      expect(res.body.study_session_id).toBe(newReviewItem.study_session_id);
      expect(res.body.correct).toBe(newReviewItem.correct);
      expect(res.body).toHaveProperty('created_at');
    });

    it('should validate required fields', async () => {
      const invalidReviewItem = {
        word_id: 1
      };

      await request(app)
        .post('/api/word-review-items')
        .send(invalidReviewItem)
        .expect(400);
    });
  });
});
