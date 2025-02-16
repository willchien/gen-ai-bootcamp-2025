const request = require('supertest');
const app = require('../../src/app');

describe('Dashboard Routes', () => {
  describe('GET /api/dashboard/last_study_session', () => {
    it('should return the last study session', async () => {
      const res = await request(app)
        .get('/api/dashboard/last_study_session')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('group_id');
      expect(res.body).toHaveProperty('created_at');
      expect(res.body).toHaveProperty('study_activity_id');
      expect(res.body).toHaveProperty('group_name');
    });
  });

  describe('GET /api/dashboard/study_progress', () => {
    it('should return study progress statistics', async () => {
      const res = await request(app)
        .get('/api/dashboard/study_progress')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('total_words_studied');
      expect(res.body).toHaveProperty('total_available_words');
    });
  });

  describe('GET /api/dashboard/quick_stats', () => {
    it('should return quick overview stats', async () => {
      const res = await request(app)
        .get('/api/dashboard/quick_stats')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('success_rate');
      expect(res.body).toHaveProperty('total_study_sessions');
      expect(res.body).toHaveProperty('total_active_groups');
      expect(res.body).toHaveProperty('study_streak_days');
    });
  });
});
