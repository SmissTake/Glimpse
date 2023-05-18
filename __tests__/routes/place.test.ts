import request from 'supertest';

import app from '../../src/index';


/**
 * Testing the GET /place/show/:id route
 */
describe('GET /place/show/:id', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/place/show/1');
    expect(response.status).toBe(200);
  });
});

/**
 * Testing the GET /place/listall route
 */
describe('GET /place/listall', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/place/listall');
    expect(response.status).toBe(200);
  });

  it('should return JSON', async () => {
    const response = await request(app).get('/place/listall');
    expect(response.type).toBe('application/json');
  });

  it('should return an array of places', async () => {
    const response = await request(app).get('/place/listall');
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return places with id, title, town, created_at, pictures, user id and pseudonym, category label, accessibility label, and favorite users', async () => {
    const response = await request(app).get('/place/listall');
    const place = response.body[0];
    expect(place).toHaveProperty('id');
    expect(place).toHaveProperty('title');
    expect(place).toHaveProperty('town');
    expect(place).toHaveProperty('created_at');
    expect(place).toHaveProperty('PicturePlaces');
    expect(place).toHaveProperty('postedBy');
    expect(place).toHaveProperty('Category');
    expect(place).toHaveProperty('Accessibility');
    expect(place).toHaveProperty('FavoriteUsers');
  });
});