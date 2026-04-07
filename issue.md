# Project Planning: User Login Feature

## Overview

Implement a user login feature for the Bun + Elysia + Drizzle + MySQL application. This includes creating a sessions table, API endpoint for user login, and organizing code into routes and services folders.

## Database Schema

### Sessions Table

Create a `sessions` table with the following structure:

- `id`: integer, auto increment, primary key
- `token`: varchar(255), not null (UUID format for user session token)
- `user_id`: integer, not null, foreign key to users table
- `created_at`: timestamp, default current_timestamp

## API Endpoint

Implement POST /api/users/login for user authentication.

### Request Body

```json
{
  "email": "eko@localhost",
  "password": "rahasia"
}
```

### Response (Success)

```json
{
  "data": "token-uuid-here"
}
```

### Response (Error)

```json
{
  "error": "Email atau password salah"
}
```

## Folder Structure in src/

- `routes/`: Contains Elysia JS routing files
- `services/`: Contains business logic files

## File Structure

- `routes/users-route.ts`: Handles user-related routes (already exists, add login endpoint)
- `services/users-service.ts`: Contains user business logic (already exists, add login logic)

## Implementation Steps

1. **Update Database Schema**: Modify `src/schema.ts` to include the sessions table definition.
2. **Add Dependencies**: Ensure uuid package is added to `package.json` for token generation.
3. **Implement Login Service**: Update `src/services/users-service.ts` with login logic:
   - Find user by email in users table
   - Compare provided password with stored bcrypt hash
   - If valid, generate UUID token
   - Create session record with token and user_id
   - Return token to client
   - If invalid, return error message
4. **Implement Login Route**: Update `src/routes/users-route.ts` with POST /api/users/login endpoint.
5. **Update Server**: Ensure the updated routes are properly registered in `src/server.ts`.
6. **Test Implementation**:
   - Test successful login with valid email and password
   - Test error case with invalid email or password
   - Verify token is stored in sessions table

## Notes

- Use bcrypt for password validation (compare input with stored hash).
- Generate UUID v4 for session tokens.
- Validate email exists in users table before password check.
- Handle errors gracefully and return appropriate error messages.
- Session tokens should be unique and traceable to specific users.
- This planning is designed for junior programmers or lower-cost AI models to implement step-by-step.
