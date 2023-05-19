import request from 'supertest';

import app from '../../src/index';

import multer, { Multer } from 'multer';

let createdPlaceIds: number;
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

/**
 * Testing the POST /place/create route
 */
describe('POST /place/create', () => {
  let upload: Multer;
  let token: string;

  beforeAll(async () => {
    upload = multer({ dest: 'uploads/' });

    // Get a bearer token for the test user
    const response = await request(app)
      .post('/user/login')
      .send({ mail: 'test@example.com', password: 'password' });
    token = response.body.token;
  });

  it('should return 401 Unauthorized if no token is provided', async () => {
    const response = await request(app)
      .post('/place/create')
      .field('title', 'Test Place')
      .field('town', 'Test Town')
      .field('description', 'Test Description')
      .field('history', 'Test History')
      .field('keyword', 'Test, Keyword')
      .field('categoriesId', '1')
      .field('accessibilitiesId', '1')
      .attach('pictures', 'uploads/test/fonderie1.jpg')
      .attach('pictures', 'uploads/test/fonderie2.jpg');
    expect(response.status).toBe(401);
  });

  it('should return 500 Bad Request if title is missing', async () => {
    const response = await request(app)
    .post('/place/create')
    .set('Authorization', `Bearer ${token}`)
    .field('town', 'Test Town')
    .field('description', 'Test Description')
    .field('history', 'Test History')
    .field('keyword', 'Test, Keyword')
    .field('categoriesId', '1')
    .field('accessibilitiesId', '1')
    .attach('pictures', 'uploads/test/fonderie1.jpg')
    .attach('pictures', 'uploads/test/fonderie2.jpg');;
    expect(response.status).toBe(500);
  });

  it('should return 200 Created if place is created successfully', async () => {
    const response = await request(app)
      .post('/place/create')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Test Place')
      .field('town', 'Test Town')
      .field('description', 'Test Description')
      .field('history', 'Test History')
      .field('keyword', 'Test, Keyword')
      .field('categoriesId', '1')
      .field('accessibilitiesId', '1')
      .attach('pictures', 'uploads/test/fonderie1.jpg')
      .attach('pictures', 'uploads/test/fonderie2.jpg');
    expect(response.status).toBe(200);
    const placeId = response.body.id;
    expect(placeId).toBeDefined();
    // Save the place ID for later use
    createdPlaceIds = placeId;
  });
});

/**
 * Testing the PUT /place/update/:id route
 */
describe('PUT /place/update/:id', () => {
  let token: string;

  beforeAll(async () => {
    // Get a bearer token for the test user
    const response = await request(app)
      .post('/user/login')
      .send({ mail: 'test@example.com', password: 'password' });
    token = response.body.token;
  });

  it('should return 401 Unauthorized if no token is provided', async () => {
    const response = await request(app)
      .put(`/place/update/${createdPlaceIds}`)
      .send({ title: 'Updated Test Place' });
    expect(response.status).toBe(401);
  });

  it('should return 200 OK if place is updated successfully', async () => {
    const response = await request(app)
      .put(`/place/update/${createdPlaceIds}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Test Place' });
    expect(response.status).toBe(200);
  }
  );
});

/**
 * Testing the DELETE /place/delete/:id route
 */
describe('DELETE /place/delete/:id', () => {
  let token: string;

  beforeAll(async () => {
    // Get a bearer token for the test user
    const response = await request(app)
      .post('/user/login')
      .send({ mail: 'test@example.com', password: 'password' });
    token = response.body.token;
  });

  it('should return 401 Unauthorized if no token is provided', async () => {
    const response = await request(app).delete(`/place/delete/${createdPlaceIds}`);
    expect(response.status).toBe(401);
  }
  );

  it('should return 200 OK if place is deleted successfully', async () => {
    const response = await request(app)
      .delete(`/place/delete/${createdPlaceIds}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  }
  );
});