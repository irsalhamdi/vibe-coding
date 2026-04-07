import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql-core';

const pool = mysql.createPool({
  host: Bun.env.DB_HOST ?? '127.0.0.1',
  port: Number(Bun.env.DB_PORT ?? '3306'),
  user: Bun.env.DB_USER ?? 'root',
  password: Bun.env.DB_PASSWORD ?? '',
  database: Bun.env.DB_NAME ?? 'vibe_coding',
  waitForConnections: true,
  connectionLimit: 10,
});

export const db = drizzle(pool);
