'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Check, X, Terminal, Clock, AlertCircle } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language?: string;
  readOnly?: boolean;
  height?: string;
  topicId?: string;
  userId?: number;
}

interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number;
  success: boolean;
}

export default function CodeEditor({ code, language = 'python', readOnly = false, height = '400px', topicId, userId }: CodeEditorProps) {
  const [editorCode, setEditorCode] = useState(code);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    setError(null);
    setExecutionTime(null);

    try {
      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: editorCode,
          topicId,
          userId,
        }),
      });

      const result: ExecutionResult = await response.json();

      if (result.success) {
        setOutput(result.output);
      } else {
        setError(result.error || 'Execution failed');
        setOutput(result.output);
      }

      setExecutionTime(result.executionTime);
    } catch (err) {
      setError('Failed to execute code. Please try again.');
      console.error('Execution error:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editorCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setEditorCode(code);
    setOutput('');
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card-bg)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--foreground)]/60">Code Editor</span>
          <span className="px-2 py-0.5 rounded text-xs bg-[var(--primary)]/10 text-[var(--primary)]">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!readOnly && (
            <>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/80 transition-colors disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                {isRunning ? 'Running...' : 'Run'}
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
                title="Reset code"
              >
                <X className="h-4 w-4 text-[var(--foreground)]/60" />
              </button>
            </>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-[var(--accent)]" /> : <Copy className="h-4 w-4 text-[var(--foreground)]/60" />}
          </button>
        </div>
      </div>

      <Editor
        height={height}
        language={language}
        value={editorCode}
        onChange={(value) => !readOnly && setEditorCode(value || '')}
        theme={document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light'}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: 'on',
        }}
      />

      {(output || error) && (
        <div className="border-t border-[var(--border)] bg-[var(--background)]">
          <div className="px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[var(--foreground)]/60" />
              <span className="text-sm font-medium text-[var(--foreground)]/60">Output</span>
              {error && (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3" />
                  Error
                </span>
              )}
            </div>
            {executionTime !== null && (
              <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                <Clock className="h-3 w-3" />
                {executionTime}ms
              </div>
            )}
          </div>
          <pre className={`p-4 text-sm font-mono whitespace-pre-wrap overflow-auto max-h-48 ${
            error ? 'text-red-500' : 'text-[var(--foreground)]'
          }`}>
            {error || output}
          </pre>
        </div>
      )}
    </div>
  );
}
