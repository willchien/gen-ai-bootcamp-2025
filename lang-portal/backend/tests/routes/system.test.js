const request = require('supertest');
const app = require('../../src/app');

describe('System Routes', () => {
  describe('GET /api/system/health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/system/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('status', 'ok');
    });
  });
});
