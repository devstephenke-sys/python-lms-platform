import { NextRequest, NextResponse } from 'next/server';
import { getCodeExecutionsByTopic, getExecutionStats } from '@/lib/db/codeExecution';
import { z } from 'zod';

const historySchema = z.object({
  topicId: z.string(),
  limit: z.number().optional().default(10),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const topicId = searchParams.get('topicId');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!topicId) {
      return NextResponse.json(
        { error: 'topicId is required' },
        { status: 400 }
      );
    }

    const executions = await getCodeExecutionsByTopic(topicId, limit);
    const stats = await getExecutionStats();

    return NextResponse.json({
      executions,
      stats
    });
  } catch (error) {
    console.error('Error fetching code execution history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
