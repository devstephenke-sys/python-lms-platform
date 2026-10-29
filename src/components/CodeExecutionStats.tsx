'use client';

import { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

interface ExecutionStats {
  total: number;
  successful: number;
  failed: number;
  avgExecutionTime: number;
}

interface CodeExecutionStatsProps {
  userId?: number;
}

export default function CodeExecutionStats({ userId }: CodeExecutionStatsProps) {
  const [stats, setStats] = useState<ExecutionStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/code/history');
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch execution stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [userId]);

  if (isLoading || !stats) {
    return null;
  }

  const successRate = stats.total > 0 ? ((stats.successful / stats.total) * 100).toFixed(1) : 0;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[var(--primary)]" />
          <h3 className="font-semibold">Code Execution Statistics</h3>
        </div>
        <button
          onClick={fetchStats}
          className="text-sm text-[var(--primary)] hover:underline"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[var(--background)]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-xs text-[var(--foreground)]/60">Total Executions</span>
          </div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--background)]">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-xs text-[var(--foreground)]/60">Successful</span>
          </div>
          <div className="text-2xl font-bold text-green-500">{stats.successful}</div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--background)]">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-xs text-[var(--foreground)]/60">Failed</span>
          </div>
          <div className="text-2xl font-bold text-red-500">{stats.failed}</div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--background)]">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-[var(--secondary)]" />
            <span className="text-xs text-[var(--foreground)]/60">Avg Time</span>
          </div>
          <div className="text-2xl font-bold">
            {stats.avgExecutionTime > 0 ? `${stats.avgExecutionTime.toFixed(0)}ms` : 'N/A'}
          </div>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--foreground)]/60">Success Rate</span>
            <span className="text-sm font-medium">{successRate}%</span>
          </div>
          <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
