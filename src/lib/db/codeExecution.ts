import { prisma } from '../prisma';

export interface CodeExecution {
  id: number;
  userId: number | null;
  topicId: string;
  code: string;
  output: string | null;
  error: string | null;
  executionTimeMs: number | null;
  success: boolean;
  createdAt: Date;
}

export interface CreateCodeExecutionInput {
  userId?: number;
  topicId: string;
  code: string;
  output?: string;
  error?: string;
  executionTimeMs?: number;
  success: boolean;
}

export async function createCodeExecution(input: CreateCodeExecutionInput): Promise<CodeExecution> {
  const execution = await prisma.codeExecution.create({
    data: {
      userId: input.userId,
      topicId: input.topicId,
      code: input.code,
      output: input.output || null,
      error: input.error || null,
      executionTimeMs: input.executionTimeMs || null,
      success: input.success,
    },
  });

  return execution;
}

export async function getCodeExecutionsByTopic(topicId: string, limit: number = 10): Promise<CodeExecution[]> {
  const executions = await prisma.codeExecution.findMany({
    where: { topicId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return executions;
}

export async function getCodeExecutionsByUser(userId: number, limit: number = 50): Promise<CodeExecution[]> {
  const executions = await prisma.codeExecution.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return executions;
}

export async function getExecutionStats(userId?: number): Promise<{
  total: number;
  successful: number;
  failed: number;
  avgExecutionTime: number;
}> {
  const where = userId ? { userId } : {};

  const total = await prisma.codeExecution.count({ where });
  const successful = await prisma.codeExecution.count({ where: { ...where, success: true } });
  const failed = await prisma.codeExecution.count({ where: { ...where, success: false } });

  const avgResult = await prisma.codeExecution.aggregate({
    where: {
      ...where,
      executionTimeMs: { not: null },
    },
    _avg: {
      executionTimeMs: true,
    },
  });

  return {
    total,
    successful,
    failed,
    avgExecutionTime: avgResult._avg.executionTimeMs || 0,
  };
}
