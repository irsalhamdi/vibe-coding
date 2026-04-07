import { Elysia } from 'elysia';
import { db } from './db.js';
import { users } from './schema.js';
import { usersRoute } from './routes/users-route.js';

type UserPayload = {
  name: string;
  email: string;
  bio?: string;
};

const app = new Elysia()
  .use(usersRoute)
  .get('/', () => ({
    status: 'ok',
    message: 'Vibe Coding API is running',
  }))
  .get('/users', async () => {
    return await db.select().from(users);
  });

const port = Number(Bun.env.PORT ?? '3000');
app.listen(port);
console.log(`Server listening on http://localhost:${port}`);
