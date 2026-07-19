import request from 'supertest';
import app from '../../src/app.js';

describe('Docs route', () => {
  it('GET /docs returns an HTML page', async () => {
    const res = await request(app).get('/docs');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  it('GET /docs/json returns the endpoint list', async () => {
    const res = await request(app).get('/docs/json');
    expect(res.status).toBe(200);
    expect(res.body.endpoints.length).toBeGreaterThan(0);
  });
});