# Vibe Coding

A Bun-based backend starter using ElysiaJS, Drizzle ORM, and MySQL.

## Setup

1. Copy `.env.example` to `.env` and update database credentials.
2. Create the MySQL database named in `DB_NAME`.
3. Install dependencies with:

```bash
bun install
```

4. Start the server:

```bash
bun run src/server.ts
```

## Project structure

- `src/server.ts` — Elysia API server with basic routes.
- `src/db.ts` — MySQL connection and Drizzle initialization.
- `src/schema.ts` — Drizzle schema definitions.

## Notes

- This is a high-level scaffold for the requested stack.
- Add migration and validation layers once the initial project is running.
