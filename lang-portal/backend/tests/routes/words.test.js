const request = require('supertest');
const app = require('../../src/app');

describe('Words Routes', () => {
  describe('GET /api/words', () => {
    it('should return paginated list of words', async () => {
      const res = await request(app)
        .get('/api/words')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('items');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.items)).toBe(true);
      
      if (res.body.items.length > 0) {
        expect(res.body.items[0]).toHaveProperty('french');
        expect(res.body.items[0]).toHaveProperty('english');
        expect(res.body.items[0]).toHaveProperty('correct_count');
        expect(res.body.items[0]).toHaveProperty('wrong_count');
      }
    });

    it('should handle sorting and pagination parameters', async () => {
      const res = await request(app)
        .get('/api/words?page=1&sort_by=french&order=asc')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.pagination.current_page).toBe(1);
    });
  });

  describe('GET /api/words/:id', () => {
    it('should return a specific word with stats', async () => {
      const res = await request(app)
        .get('/api/words/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('french');
      expect(res.body).toHaveProperty('english');
      expect(res.body).toHaveProperty('stats');
      expect(res.body).toHaveProperty('groups');
    });

    it('should return 404 for non-existent word', async () => {
      await request(app)
        .get('/api/words/999999')
        .expect(404);
    });
  });

  describe('POST /api/words', () => {
    it('should create a new word', async () => {
      const newWord = {
        french: 'au revoir',
        english: 'goodbye',
        groups: [{ id: 1, name: 'Basic Greetings' }]
      };

      const res = await request(app)
        .post('/api/words')
        .send(newWord)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.french).toBe(newWord.french);
      expect(res.body.english).toBe(newWord.english);
    });

    it('should validate required fields', async () => {
      const invalidWord = {
        french: 'au revoir'
      };

      await request(app)
        .post('/api/words')
        .send(invalidWord)
        .expect(400);
    });
  });
});
