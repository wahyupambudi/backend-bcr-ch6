import request from "supertest"
import app from "../app/index"

// describe('Testing Endpoint Login', () => {
//     test('return http code 200 after hit endpoint', async () => {
//         const endpoint = await request(app).get('/api/v1/cars/available')
//         expect(endpoint.status).toBe(200)
//     })
// })

describe('POST /api/v1/auth/login', () => {
    it('should respond with json containing a success message', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'superadmin@mail.com', password: 'superadmin' })
        .set('Accept', 'application/json');
  
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: 'superadmin@mail.com',
          token: expect.any(String),
          created_At: expect.any(String),
          updated_At: expect.any(String)
        })
      );
    });
  
    it('should respond with json containing an error message for invalid login', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'wronguser', password: 'wrongpassword' })
        .set('Accept', 'application/json');
  
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });