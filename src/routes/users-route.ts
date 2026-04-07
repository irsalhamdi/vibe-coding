import { Elysia } from 'elysia';
import { registerUser, RegisterUserRequest, loginUser, LoginUserRequest } from '../services/users-service.js';

export const usersRoute = new Elysia()
  .post('/api/users', async ({ body }) => {
    const request = body as RegisterUserRequest;
    const response = await registerUser(request);
    return response;
  })
  .post('/api/users/login', async ({ body }) => {
    const request = body as LoginUserRequest;
    const response = await loginUser(request);
    return response;
  });