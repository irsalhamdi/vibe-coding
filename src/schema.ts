import { mysqlTable, serial, varchar, text, timestamp, foreignKey, int, bigint } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = mysqlTable('sessions', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  token: varchar('token', { length: 255 }).notNull(),
  userId: bigint('user_id', { mode: 'number' }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdFk: foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
  }),
}));

