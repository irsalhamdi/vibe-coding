import { Elysia } from 'elysia';
import { db } from './db.js';
import { users } from './schema.js';

type UserPayload = {
  name: string;
  email: string;
  bio?: string;
};

const app = new Elysia()
  .get('/', () => ({
    status: 'ok',
    message: 'Vibe Coding API is running',
  }))
  .get('/users', async () => {
    return await db.select().from(users);
  })
  .post('/users', async ({ body }) => {
    const payload = body as UserPayload;
    await db.insert(users).values({
      name: payload.name,
      email: payload.email,
      bio: payload.bio ?? null,
    });
    return {
      status: 'created',
    };
  });

const port = Number(Bun.env.PORT ?? '3000');
app.listen(port);
console.log(`Server listening on http://localhost:${port}`);
