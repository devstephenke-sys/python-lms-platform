import db from './schema';

export interface CodeExecution {
  id: number;
  user_id: number | null;
  topic_id: string;
  code: string;
  output: string | null;
  error: string | null;
  execution_time_ms: number | null;
  success: boolean;
  created_at: string;
}

export interface CreateCodeExecutionInput {
  user_id?: number;
  topic_id: string;
  code: string;
  output?: string;
  error?: string;
  execution_time_ms?: number;
  success: boolean;
}

export async function createCodeExecution(input: CreateCodeExecutionInput): Promise<CodeExecution> {
  const stmt = db.prepare(`
    INSERT INTO code_executions (user_id, topic_id, code, output, error, execution_time_ms, success)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.user_id || null,
    input.topic_id,
    input.code,
    input.output || null,
    input.error || null,
    input.execution_time_ms || null,
    input.success ? 1 : 0
  );

  const execution = db.prepare('SELECT * FROM code_executions WHERE id = ?').get(result.lastInsertRowid) as CodeExecution;
  return execution;
}

export async function getCodeExecutionsByTopic(topicId: string, limit: number = 10): Promise<CodeExecution[]> {
  const executions = db.prepare(`
    SELECT * FROM code_executions
    WHERE topic_id = ?
    ORDER BY created_at DESC
    LIMIT ?
  `).all(topicId, limit) as CodeExecution[];
  return executions;
}

export async function getCodeExecutionsByUser(userId: number, limit: number = 50): Promise<CodeExecution[]> {
  const executions = db.prepare(`
    SELECT * FROM code_executions
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT ?
  `).all(userId, limit) as CodeExecution[];
  return executions;
}

export async function getExecutionStats(userId?: number): Promise<{
  total: number;
  successful: number;
  failed: number;
  avgExecutionTime: number;
}> {
  const whereClause = userId ? 'WHERE user_id = ?' : '';
  const params = userId ? [userId] : [];

  const total = db.prepare(`SELECT COUNT(*) as count FROM code_executions ${whereClause}`).get(...params) as { count: number };
  const successful = db.prepare(`SELECT COUNT(*) as count FROM code_executions ${whereClause} AND success = 1`).get(...params) as { count: number };
  const failed = db.prepare(`SELECT COUNT(*) as count FROM code_executions ${whereClause} AND success = 0`).get(...params) as { count: number };
  const avgTime = db.prepare(`SELECT AVG(execution_time_ms) as avg FROM code_executions ${whereClause} AND execution_time_ms IS NOT NULL`).get(...params) as { avg: number | null };

  return {
    total: total.count,
    successful: successful.count,
    failed: failed.count,
    avgExecutionTime: avgTime.avg || 0
  };
}
