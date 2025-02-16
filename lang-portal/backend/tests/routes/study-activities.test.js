const request = require('supertest');
const app = require('../../src/app');

describe('Study Activities Routes', () => {
  describe('GET /api/study-activities/:id', () => {
    it('should return a specific study activity', async () => {
      const res = await request(app)
        .get('/api/study-activities/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('thumbnail_url');
      expect(res.body).toHaveProperty('description');
    });

    it('should return 404 for non-existent activity', async () => {
      await request(app)
        .get('/api/study-activities/999999')
        .expect(404);
    });
  });

  describe('GET /api/study-activities/:id/study-sessions', () => {
    it('should return paginated list of study sessions for an activity', async () => {
      const res = await request(app)
        .get('/api/study-activities/1/study-sessions')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('items');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.items)).toBe(true);
      
      if (res.body.items.length > 0) {
        expect(res.body.items[0]).toHaveProperty('id');
        expect(res.body.items[0]).toHaveProperty('activity_name');
        expect(res.body.items[0]).toHaveProperty('group_name');
        expect(res.body.items[0]).toHaveProperty('start_time');
        expect(res.body.items[0]).toHaveProperty('end_time');
        expect(res.body.items[0]).toHaveProperty('review_items_count');
      }
    });
  });

  describe('POST /api/study-activities', () => {
    it('should create a new study activity', async () => {
      const newActivity = {
        group_id: 1,
        study_activity_id: 1
      };

      const res = await request(app)
        .post('/api/study-activities')
        .send(newActivity)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('group_id');
    });

    it('should validate required fields', async () => {
      const invalidActivity = {
        group_id: 1
      };

      await request(app)
        .post('/api/study-activities')
        .send(invalidActivity)
        .expect(400);
    });
  });
});
