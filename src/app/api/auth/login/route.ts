import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/db/users';
import { initDb } from '@/lib/db/init-server';
import { z } from 'zod';

// Initialize database
initDb();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Verify credentials
    const user = await verifyPassword(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In production, you would set a session cookie or JWT here
    // For now, we'll return the user data
    return NextResponse.json(
      { message: 'Login successful', user },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
