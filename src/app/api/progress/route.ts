import { NextRequest, NextResponse } from 'next/server';
import { markTopicComplete, getProgressByUser, getProgressByModule, getModuleCompletionPercentage } from '@/lib/db/progress';
import { z } from 'zod';

const markCompleteSchema = z.object({
  userId: z.number(),
  moduleId: z.string(),
  topicId: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const moduleId = searchParams.get('moduleId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (moduleId) {
      const progress = await getProgressByModule(parseInt(userId), moduleId);
      return NextResponse.json({ progress });
    }

    const progress = await getProgressByUser(parseInt(userId));
    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, moduleId, topicId } = markCompleteSchema.parse(body);

    const progress = await markTopicComplete(userId, moduleId, topicId);

    return NextResponse.json(
      { message: 'Progress marked', progress },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Mark progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
