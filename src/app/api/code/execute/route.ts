import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { initDb } from '@/lib/db/init-server';
import { createCodeExecution } from '@/lib/db/codeExecution';
import { z } from 'zod';

// Initialize database
initDb();

const executeSchema = z.object({
  code: z.string().max(10000),
  topicId: z.string().optional(),
  userId: z.number().optional(),
});

// Dangerous modules that should not be imported
const DANGEROUS_IMPORTS = [
  'os',
  'sys',
  'subprocess',
  'shutil',
  'pickle',
  'marshal',
  'eval',
  'exec',
  'compile',
  'open',
  'file',
  'input',
  'raw_input',
  '__import__',
  'importlib',
  'ctypes',
  'multiprocessing',
  'threading',
  'socket',
  'urllib',
  'urllib2',
  'http',
  'ftplib',
  'smtplib',
  'telnetlib',
  'socket',
];

// Time limit for code execution (seconds)
const EXECUTION_TIMEOUT = 10;

// Maximum output size (characters)
const MAX_OUTPUT_SIZE = 10000;

function sanitizeCode(code: string): { isSafe: boolean; error?: string } {
  // Check for dangerous imports
  for (const dangerous of DANGEROUS_IMPORTS) {
    const importPattern = new RegExp(`\\bimport\\s+${dangerous}\\b`, 'g');
    const fromPattern = new RegExp(`\\bfrom\\s+${dangerous}\\s+import\\b`, 'g');

    if (importPattern.test(code) || fromPattern.test(code)) {
      return {
        isSafe: false,
        error: `Import of '${dangerous}' is not allowed for security reasons.`
      };
    }
  }

  // Check for eval/exec
  if (/\beval\s*\(/.test(code) || /\bexec\s*\(/.test(code)) {
    return {
      isSafe: false,
      error: 'Use of eval() or exec() is not allowed for security reasons.'
    };
  }

  // Check for __import__
  if (/__import__/.test(code)) {
    return {
      isSafe: false,
      error: 'Use of __import__ is not allowed for security reasons.'
    };
  }

  return { isSafe: true };
}

async function executePythonCode(code: string): Promise<{
  output: string;
  error: string | null;
  executionTime: number;
  success: boolean;
}> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let output = '';
    let error = '';
    let timedOut = false;

    // Spawn Python process
    const python = spawn('python', ['-c', code]);

    // Set timeout
    const timeout = setTimeout(() => {
      timedOut = true;
      python.kill();
      error = 'Execution timed out. Your code took too long to run.';
    }, EXECUTION_TIMEOUT * 1000);

    // Capture stdout
    python.stdout.on('data', (data) => {
      output += data.toString();
      // Truncate if too large
      if (output.length > MAX_OUTPUT_SIZE) {
        output = output.substring(0, MAX_OUTPUT_SIZE) + '\n... (output truncated)';
      }
    });

    // Capture stderr
    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    // Handle process exit
    python.on('close', (code) => {
      clearTimeout(timeout);

      if (timedOut) {
        resolve({
          output: '',
          error: 'Execution timed out. Your code took too long to run.',
          executionTime: EXECUTION_TIMEOUT * 1000,
          success: false
        });
        return;
      }

      const executionTime = Date.now() - startTime;

      // Clean up output (remove extra newlines)
      output = output.trim();
      error = error.trim();

      resolve({
        output: output || 'Code executed successfully with no output.',
        error: error || null,
        executionTime,
        success: code === 0
      });
    });

    // Handle process error
    python.on('error', (err) => {
      clearTimeout(timeout);
      resolve({
        output: '',
        error: `Failed to execute Python: ${err.message}. Please ensure Python is installed on the server.`,
        executionTime: Date.now() - startTime,
        success: false
      });
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, topicId, userId } = executeSchema.parse(body);

    // Sanitize code
    const sanitization = sanitizeCode(code);
    if (!sanitization.isSafe) {
      return NextResponse.json(
        {
          error: sanitization.error,
          output: '',
          executionTime: 0,
          success: false
        },
        { status: 400 }
      );
    }

    // Execute code
    const result = await executePythonCode(code);

    // Log execution to database
    if (topicId) {
      try {
        await createCodeExecution({
          user_id: userId,
          topic_id: topicId,
          code,
          output: result.output,
          error: result.error || undefined,
          execution_time_ms: result.executionTime,
          success: result.success
        });
      } catch (dbError) {
        console.error('Failed to log code execution:', dbError);
        // Don't fail the request if logging fails
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Code execution error:', error);
    return NextResponse.json(
      { error: 'Internal server error', output: '', executionTime: 0, success: false },
      { status: 500 }
    );
  }
}
