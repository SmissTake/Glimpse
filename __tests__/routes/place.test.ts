import request from 'supertest';

import app from '../../src/index';


/**
 * Testing the GET /place/listall route
 */
describe('GET /place/listall', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/place/listall');
    expect(response.status).toBe(200);
  });
});

// describe('POST /api/my-endpoint', () => {
//   it('should return 200 OK', async () => {
//     const res = await request(app)
//       .post('/api/my-endpoint')
//       .field('title', 'ENCORE2')
//       .field('description', 'Hopital abandonné depuis une quarantaine d\'année, beaucoup d\'équipement ancien')
//       .field('history', 'L\'hôpital abandonné est un bâtiment imposant et effrayant, construit dans les années 1920. Il a été fermé dans les années 80 en raison de la modernisation des soins médicaux. Les fenêtres sont brisées, la peinture s\'écaille et l\'herbe pousse sur le terrain autour de l\'édifice. Les patients et le personnel ont été déplacés vers d\'autres hôpitaux, mais les lits, les instruments médicaux et les documents administratifs restent encore à l\'intérieur. Les rumeurs disent que l\'hôpital est hanté par les fantômes des patients décédés. Il est dangereux de pénétrer à l\'intérieur en raison de l\'état de délabrement avancé du bâtiment.')
//       .field('town', 'Douarnenez')
//       .field('keyword', 'hopital, medical, batiment')
//       .field('categoriesId', '1')
//       .field('accessibilitiesId', '1')
//       .attach('pictures', 'path/to/picture1.jpg')
//       .attach('pictures', 'path/to/picture2.jpg')
//       .attach('pictures', 'path/to/picture3.jpg');
    
//     expect(res.status).toBe(200);
//   });
// });

/**
 * Testing the GET /place/show/:id route
 */
describe('GET /place/show/:id', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/place/show/1');
    expect(response.status).toBe(200);
  });
});