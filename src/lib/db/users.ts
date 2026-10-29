import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      name: input.name,
      role: input.role || 'student',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return {
    ...user,
    role: user.role as 'student' | 'instructor' | 'admin',
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) return null;

  return {
    ...user,
    role: user.role as 'student' | 'instructor' | 'admin',
  };
}

export async function getUserById(id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) return null;

  return {
    ...user,
    role: user.role as 'student' | 'instructor' | 'admin',
  };
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

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
