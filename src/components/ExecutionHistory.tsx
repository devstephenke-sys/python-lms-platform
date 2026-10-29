'use client';

import { useState, useEffect } from 'react';
import { History, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ExecutionRecord {
  id: number;
  code: string;
  output: string | null;
  error: string | null;
  execution_time_ms: number | null;
  success: boolean;
  created_at: string;
}

interface ExecutionHistoryProps {
  topicId: string;
  limit?: number;
}

export default function ExecutionHistory({ topicId, limit = 5 }: ExecutionHistoryProps) {
  const [executions, setExecutions] = useState<ExecutionRecord[]>([]);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/code/history?topicId=${topicId}&limit=${limit}`);
      const data = await response.json();
      setExecutions(data.executions || []);
    } catch (error) {
      console.error('Failed to fetch execution history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [topicId, limit]);

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (executions.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-[var(--primary)]" />
          <h3 className="font-semibold">Execution History</h3>
        </div>
        {executions.length > 0 && (
          <button
            onClick={() => fetchHistory()}
            className="text-sm text-[var(--primary)] hover:underline"
          >
            Refresh
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="text-sm text-[var(--foreground)]/60">Loading history...</div>
      ) : (
        <div className="space-y-2">
          {executions.slice(0, showAll ? executions.length : 3).map((execution) => (
            <div
              key={execution.id}
              className="border border-[var(--border)] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(execution.id)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-[var(--background)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  {execution.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {execution.success ? 'Success' : 'Failed'}
                  </span>
                  {execution.execution_time_ms && (
                    <span className="text-xs text-[var(--foreground)]/60 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {execution.execution_time_ms}ms
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--foreground)]/60">
                    {formatTime(execution.created_at)}
                  </span>
                  {expanded.has(execution.id) ? (
                    <ChevronUp className="h-4 w-4 text-[var(--foreground)]/60" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[var(--foreground)]/60" />
                  )}
                </div>
              </button>

              {expanded.has(execution.id) && (
                <div className="border-t border-[var(--border)] p-3 space-y-2">
                  <div>
                    <div className="text-xs text-[var(--foreground)]/60 mb-1">Code:</div>
                    <pre className="text-xs font-mono bg-[var(--background)] p-2 rounded overflow-x-auto">
                      {execution.code}
                    </pre>
                  </div>
                  {execution.output && (
                    <div>
                      <div className="text-xs text-[var(--foreground)]/60 mb-1">Output:</div>
                      <pre className="text-xs font-mono bg-[var(--background)] p-2 rounded overflow-x-auto">
                        {execution.output}
                      </pre>
                    </div>
                  )}
                  {execution.error && (
                    <div>
                      <div className="text-xs text-red-500 mb-1">Error:</div>
                      <pre className="text-xs font-mono bg-red-500/10 p-2 rounded overflow-x-auto text-red-500">
                        {execution.error}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {executions.length > 3 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full text-center text-sm text-[var(--primary)] hover:underline py-2"
            >
              Show all {executions.length} executions
            </button>
          )}
        </div>
      )}
    </div>
  );
}
