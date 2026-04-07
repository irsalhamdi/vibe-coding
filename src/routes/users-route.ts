import { Elysia } from 'elysia';
import { registerUser, RegisterUserRequest, loginUser, LoginUserRequest, getCurrentUser } from '../services/users-service.js';

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
  })
  .get('/api/users/current', async ({ headers }) => {
    const authHeader = headers.authorization;
    
    // Check if Authorization header exists
    if (!authHeader) {
      return { error: 'Unauthorized' };
    }

    // Extract token from Bearer scheme
    if (!authHeader.startsWith('Bearer ')) {
      return { error: 'Unauthorized' };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Get current user by token
    const response = await getCurrentUser(token);
    return response;
  });