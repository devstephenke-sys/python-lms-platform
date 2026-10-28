import db from './schema';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  created_at: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: 'student' | 'instructor' | 'admin';
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (email, password, name, role)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(input.email, hashedPassword, input.name, input.role || 'student');

  const user = db.prepare('SELECT id, email, name, role, created_at FROM users WHERE id = ?').get(result.lastInsertRowid) as User;

  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = db.prepare('SELECT id, email, name, role, created_at FROM users WHERE email = ?').get(email) as User | undefined;
  return user || null;
}

export async function getUserById(id: number): Promise<User | null> {
  const user = db.prepare('SELECT id, email, name, role, created_at FROM users WHERE id = ?').get(id) as User | undefined;
  return user || null;
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const user = db.prepare('SELECT id, email, password, name, role, created_at FROM users WHERE email = ?').get(email) as any;

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}
