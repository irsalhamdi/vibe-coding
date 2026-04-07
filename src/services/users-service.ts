import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';
import { users, sessions } from '../schema.js';
import { eq } from 'drizzle-orm';

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  data?: string;
  error?: string;
}

export interface LoginUserResponse {
  data?: string;
  error?: string;
}

export interface GetCurrentUserResponse {
  data?: {
    id: number;
    name: string;
    email: string;
    createdAt: Date | null;
  };
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

export async function loginUser(request: LoginUserRequest): Promise<LoginUserResponse> {
  try {
    // Find user by email
    const userList = await db.select().from(users).where(eq(users.email, request.email)).limit(1);
    if (userList.length === 0) {
      return { error: 'Email atau password salah' };
    }

    const user = userList[0];

    // Compare password with bcrypt hash
    const passwordMatch = await bcrypt.compare(request.password, user.password);
    if (!passwordMatch) {
      return { error: 'Email atau password salah' };
    }

    // Generate UUID token
    const token = uuidv4();

    // Create session record
    await db.insert(sessions).values({
      token,
      userId: user.id,
    });

    return { data: token };
  } catch (error) {
    console.error('Error logging in user:', error);
    return { error: 'Internal server error' };
  }
}

export async function getCurrentUser(token: string): Promise<GetCurrentUserResponse> {
  try {
    // Find session by token
    const sessionList = await db.select().from(sessions).where(eq(sessions.token, token)).limit(1);
    if (sessionList.length === 0) {
      return { error: 'Unauthorized' };
    }

    const session = sessionList[0];

    // Get user by user_id from session
    const userList = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
    if (userList.length === 0) {
      return { error: 'Unauthorized' };
    }

    const user = userList[0];

    // Return user data without password
    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { error: 'Internal server error' };
  }
}