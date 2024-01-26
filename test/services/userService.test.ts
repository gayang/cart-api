import request from "supertest";
import connect, { MongoHelper } from "../db-server";
import app from "../..";
import { loginUserByPermission } from "../mockData/loginUser";
import userData from "../mockData/userData";

describe('User Endpoints', () => {
  let userId: string;

  // Test case-1
  test('Should view all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body.users).toBeInstanceOf(Array);
  });

  // Test case-2
  test('Should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        firstName: "Sam",
        lastName: "Sonar",
        email: "sam@gmai.com",
        password: "4433221",
        role: "user",
        avatar: "",
        permission: ["USERS_READ", "USERS_UPDATE"],
        phoneNumber:"12345678"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    userId = response.body.user.id;
  });


  // Test case-3
  test('Should delete user', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});