import { prisma } from '../prisma';

export interface Progress {
  id: number;
  userId: number;
  moduleId: string;
  topicId: string;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  success?: boolean;
}

export async function markTopicComplete(userId: number, moduleId: string, topicId: string): Promise<Progress> {
  const progress = await prisma.progress.upsert({
    where: {
      userId_topicId: {
        userId,
        topicId,
      },
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId,
      moduleId,
      topicId,
      completed: true,
      completedAt: new Date(),
    },
  });

  return progress;
}

export async function getProgressByUser(userId: number): Promise<Progress[]> {
  const progress = await prisma.progress.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return progress;
}

export async function getProgressByModule(userId: number, moduleId: string): Promise<Progress[]> {
  const progress = await prisma.progress.findMany({
    where: {
      userId,
      moduleId,
    },
    orderBy: { createdAt: 'desc' },
  });

  return progress;
}

export async function getModuleCompletionPercentage(userId: number, moduleId: string, totalTopics: number): Promise<number> {
  const completed = await prisma.progress.count({
    where: {
      userId,
      moduleId,
      completed: true,
    },
  });

  return totalTopics > 0 ? (completed / totalTopics) * 100 : 0;
}
