const request = require('supertest');
const app = require('../../src/app');

describe('Study Sessions Routes', () => {
  describe('GET /api/study-sessions', () => {
    it('should return paginated list of study sessions', async () => {
      const res = await request(app)
        .get('/api/study-sessions')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('items');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.items)).toBe(true);
      
      if (res.body.items.length > 0) {
        expect(res.body.items[0]).toHaveProperty('id');
        expect(res.body.items[0]).toHaveProperty('group_id');
        expect(res.body.items[0]).toHaveProperty('study_activity_id');
        expect(res.body.items[0]).toHaveProperty('created_at');
        expect(res.body.items[0]).toHaveProperty('group_name');
      }
    });
  });

  describe('GET /api/study-sessions/recent', () => {
    it('should return the most recent study session', async () => {
      const res = await request(app)
        .get('/api/study-sessions/recent')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('group_id');
      expect(res.body).toHaveProperty('created_at');
      expect(res.body).toHaveProperty('study_activity_id');
      expect(res.body).toHaveProperty('group_name');
    });
  });

  describe('GET /api/study-sessions/:id', () => {
    it('should return a specific study session', async () => {
      const res = await request(app)
        .get('/api/study-sessions/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('group_id');
      expect(res.body).toHaveProperty('study_activity_id');
      expect(res.body).toHaveProperty('created_at');
      expect(res.body).toHaveProperty('group_name');
      expect(res.body).toHaveProperty('review_items_count');
      expect(res.body).toHaveProperty('start_time');
    });

    it('should return 404 for non-existent session', async () => {
      await request(app)
        .get('/api/study-sessions/999999')
        .expect(404);
    });
  });

  describe('POST /api/study-sessions', () => {
    it('should create a new study session', async () => {
      const newSession = {
        group_id: 1,
        study_activity_id: 1
      };

      const res = await request(app)
        .post('/api/study-sessions')
        .send(newSession)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.group_id).toBe(newSession.group_id);
      expect(res.body.study_activity_id).toBe(newSession.study_activity_id);
      expect(res.body).toHaveProperty('created_at');
      expect(res.body).toHaveProperty('start_time');
    });

    it('should validate required fields', async () => {
      const invalidSession = {
        group_id: 1
      };

      await request(app)
        .post('/api/study-sessions')
        .send(invalidSession)
        .expect(400);
    });
  });
});
