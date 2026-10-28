import db from './schema';

export interface Progress {
  id: number;
  user_id: number;
  module_id: string;
  topic_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function markTopicComplete(userId: number, moduleId: string, topicId: string): Promise<Progress> {
  const stmt = db.prepare(`
    INSERT INTO progress (user_id, module_id, topic_id, completed, completed_at)
    VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, topic_id)
    DO UPDATE SET
      completed = 1,
      completed_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
  `);

  const result = stmt.run(userId, moduleId, topicId);

  const progress = db.prepare('SELECT * FROM progress WHERE id = ?').get(result.lastInsertRowid) as Progress;
  return progress;
}

export async function getProgressByUser(userId: number): Promise<Progress[]> {
  const progress = db.prepare('SELECT * FROM progress WHERE user_id = ?').all(userId) as Progress[];
  return progress;
}

export async function getProgressByModule(userId: number, moduleId: string): Promise<Progress[]> {
  const progress = db.prepare('SELECT * FROM progress WHERE user_id = ? AND module_id = ?').all(userId, moduleId) as Progress[];
  return progress;
}

export async function getModuleCompletionPercentage(userId: number, moduleId: string, totalTopics: number): Promise<number> {
  const completed = db.prepare(`
    SELECT COUNT(*) as count
    FROM progress
    WHERE user_id = ? AND module_id = ? AND completed = 1
  `).get(userId, moduleId) as { count: number };

  return totalTopics > 0 ? (completed.count / totalTopics) * 100 : 0;
}
