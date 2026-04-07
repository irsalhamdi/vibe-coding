import bcrypt from 'bcrypt';
import { db } from '../db.js';
import { users } from '../schema.js';
import { eq } from 'drizzle-orm';

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  data?: string;
  error?: string;
}

export async function registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
  try {
    // Check if email already exists
    const existingUser = await db.select().from(users).where(eq(users.email, request.email)).limit(1);
    if (existingUser.length > 0) {
      return { error: 'Email sudah terdaftar' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(request.password, 10);

    // Insert new user
    await db.insert(users).values({
      name: request.name,
      email: request.email,
      password: hashedPassword,
    });

    return { data: 'OK' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Internal server error' };
  }
}