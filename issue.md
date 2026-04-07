# Project Planning: Get Current User API Feature

## Overview
Implement a GET current user endpoint for the Bun + Elysia + Drizzle + MySQL application. This feature allows authenticated users to retrieve their profile information using their session token from the Authorization header.

## API Endpoint
Implement GET /api/users/current for retrieving current authenticated user information.

### Request Headers
```
Authorization: Bearer <token>
```
Where `<token>` is a valid UUID token from the sessions table.

### Response (Success - 200)
```json
{
  "data": {
    "id": 1,
    "name": "Eko",
    "email": "eko@localhost",
    "created_at": "2026-04-07T10:30:00.000Z"
  }
}
```

### Response (Error - 401)
```json
{
  "error": "Unauthorized"
}
```

## Folder Structure in src/
- `routes/`: Contains Elysia JS routing files
- `services/`: Contains business logic files

## File Structure
- `routes/users-route.ts`: Handles user-related routes (already exists, add GET endpoint)
- `services/users-service.ts`: Contains user business logic (already exists, add getCurrentUser function)

## Implementation Steps

1. **Create Helper Function for Token Extraction**: 
   - Add a function to extract and validate Bearer token from Authorization header
   - Handle cases where header is missing or malformed
   - Return null if token is invalid format

2. **Implement Get Current User Service**: 
   - Create `getCurrentUser(token: string)` function in `src/services/users-service.ts`
   - Query sessions table to find session with matching token
   - If session not found, return error response
   - If session found, get user_id from session
   - Query users table with the user_id to get user data (id, name, email, created_at)
   - Return user data
   - Handle any database errors gracefully

3. **Implement Get Current User Route**: 
   - Add GET /api/users/current endpoint to `src/routes/users-route.ts`
   - Extract Authorization header from request
   - Parse Bearer token from header
   - If token missing or invalid, return `{ error: "Unauthorized" }` with 401 status
   - Call getCurrentUser service with token
   - Return response from service (either user data or error)

4. **Update Server**: 
   - Ensure routes are properly registered in `src/server.ts`
   - No changes needed if routes are already exported correctly

5. **Test Implementation**:
   - Test with valid token: GET /api/users/current with Authorization header containing valid token
   - Test with invalid token: GET /api/users/current with invalid/non-existent token
   - Test with missing header: GET /api/users/current without Authorization header
   - Verify response format matches specification

## Implementation Notes

- **Bearer Token Format**: Authorization header should be "Bearer <token>", not just the token
- **Token Validation**: Check if token exists in sessions table before querying users
- **User Data**: Only return id, name, email, and created_at fields (no password)
- **Error Handling**: Return 401 Unauthorized for any authentication failures
- **HTTP Status Codes**: 
  - 200 for successful get
  - 401 for unauthorized access
- **Header Parsing**: Use Elysia's built-in header parsing to extract Authorization header
- **Session Lookup**: Join sessions and users tables or make separate queries to get user data from token

## File Modifications

### src/services/users-service.ts
- Add `getCurrentUser(token: string)` function
- Return type: `{ id, name, email, createdAt }` or `null`
- Handle errors with try-catch

### src/routes/users-route.ts
- Add `.get('/api/users/current', async ({ headers }) => { ... })` route
- Extract token from headers.authorization
- Validate token format (should start with "Bearer ")
- Call getCurrentUser service
- Return user data or error response

## Notes
- This is designed for junior programmers or lower-cost AI models to implement step-by-step
- Follow the existing code patterns in the project
- Keep error messages clear and concise
- Ensure all database queries are async and properly await
