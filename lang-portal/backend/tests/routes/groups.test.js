const request = require('supertest');
const app = require('../../src/app');

describe('Groups Routes', () => {
  describe('GET /api/groups', () => {
    it('should return paginated list of groups', async () => {
      const res = await request(app)
        .get('/api/groups')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('items');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.items)).toBe(true);
      
      if (res.body.items.length > 0) {
        expect(res.body.items[0]).toHaveProperty('id');
        expect(res.body.items[0]).toHaveProperty('name');
        expect(res.body.items[0]).toHaveProperty('stats');
        expect(res.body.items[0].stats).toHaveProperty('total_word_count');
      }
    });
  });

  describe('GET /api/groups/:id', () => {
    it('should return a specific group with detailed stats', async () => {
      const res = await request(app)
        .get('/api/groups/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('stats');
      expect(res.body.stats).toHaveProperty('total_word_count');
      expect(res.body.stats).toHaveProperty('words_studied');
      expect(res.body.stats).toHaveProperty('success_rate');
    });

    it('should return 404 for non-existent group', async () => {
      await request(app)
        .get('/api/groups/999999')
        .expect(404);
    });
  });

  describe('POST /api/groups', () => {
    it('should create a new group', async () => {
      const newGroup = {
        name: 'Numbers'
      };

      const res = await request(app)
        .post('/api/groups')
        .send(newGroup)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(newGroup.name);
      expect(res.body).toHaveProperty('stats');
    });

    it('should validate required fields', async () => {
      const invalidGroup = {};

      await request(app)
        .post('/api/groups')
        .send(invalidGroup)
        .expect(400);
    });
  });
});
