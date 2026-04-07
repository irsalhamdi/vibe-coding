import { Elysia } from 'elysia';
import { registerUser, RegisterUserRequest } from '../services/users-service.js';

export const usersRoute = new Elysia()
  .post('/api/users', async ({ body }) => {
    const request = body as RegisterUserRequest;
    const response = await registerUser(request);
    return response;
  });