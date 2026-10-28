'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Check, X } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

export default function CodeEditor({ code, language = 'python', readOnly = false, height = '400px' }: CodeEditorProps) {
  const [editorCode, setEditorCode] = useState(code);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running Python code...\n\nNote: This is a frontend demo. In production, this would connect to a Python backend to execute code.\n\nTo run Python code locally:\n1. Install Python from python.org\n2. Save the code to a .py file\n3. Run: python filename.py');

    setTimeout(() => {
      setIsRunning(false);
    }, 1000);
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

      {output && (
        <div className="border-t border-[var(--border)] bg-[var(--background)]">
          <div className="px-4 py-2 border-b border-[var(--border)]">
            <span className="text-sm font-medium text-[var(--foreground)]/60">Output</span>
          </div>
          <pre className="p-4 text-sm font-mono text-[var(--foreground)] whitespace-pre-wrap overflow-auto max-h-48">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
