# Code Execution Feature

## Overview

The Code Execution feature allows students to run Python code directly in the browser within the LMS platform. This provides an interactive learning experience where students can experiment with code examples and see immediate results.

## Architecture

### Backend Components

1. **Database Schema** (`src/lib/db/schema.ts`)
   - `code_executions` table to track all code execution attempts
   - Stores: user_id, topic_id, code, output, error, execution_time_ms, success, created_at

2. **Database Functions** (`src/lib/db/codeExecution.ts`)
   - `createCodeExecution()` - Log execution attempts
   - `getCodeExecutionsByTopic()` - Retrieve history for a specific topic
   - `getCodeExecutionsByUser()` - Retrieve user's execution history
   - `getExecutionStats()` - Get overall statistics

3. **API Routes**
   - `POST /api/code/execute` - Execute Python code with security measures
   - `GET /api/code/history` - Retrieve execution history and statistics

### Frontend Components

1. **CodeEditor** (`src/components/CodeEditor.tsx`)
   - Monaco Editor integration for code editing
   - Real-time code execution via API
   - Output display with error handling
   - Execution time tracking
   - Copy and reset functionality

2. **ExecutionHistory** (`src/components/ExecutionHistory.tsx`)
   - Display recent code executions for a topic
   - Expandable code/output/error details
   - Success/failure indicators
   - Execution time and timestamp

3. **CodeExecutionStats** (`src/components/CodeExecutionStats.tsx`)
   - Dashboard statistics component
   - Total executions, success/failure counts
   - Average execution time
   - Success rate visualization

## Security Features

### Code Sanitization

The execution API implements multiple security layers:

1. **Dangerous Import Blocking**
   - Blocks imports of: os, sys, subprocess, shutil, pickle, marshal, eval, exec, compile, etc.
   - Prevents file system access, process spawning, and code injection

2. **Function Blocking**
   - Blocks use of `eval()`, `exec()`, and `__import__`
   - Prevents dynamic code execution

3. **Execution Timeout**
   - 10-second timeout limit per execution
   - Prevents infinite loops and resource exhaustion

4. **Output Limiting**
   - Maximum output size: 10,000 characters
   - Prevents memory issues from excessive output

5. **Input Validation**
   - Zod schema validation
   - Maximum code length: 10,000 characters
   - Type checking for all inputs

### Server-Side Execution

- Python code is executed using Node.js `spawn` with Python interpreter
- Each execution runs in a separate process
- Processes are killed on timeout
- No persistent state between executions

## API Documentation

### POST /api/code/execute

Execute Python code securely.

**Request Body:**
```json
{
  "code": "print('Hello, World!')",
  "topicId": "what-is-python",
  "userId": 1
}
```

**Response:**
```json
{
  "output": "Hello, World!",
  "error": null,
  "executionTime": 45,
  "success": true
}
```

**Error Response:**
```json
{
  "error": "Import of 'os' is not allowed for security reasons.",
  "output": "",
  "executionTime": 0,
  "success": false
}
```

### GET /api/code/history

Retrieve execution history and statistics.

**Query Parameters:**
- `topicId` (required): Topic identifier
- `limit` (optional, default: 10): Number of records to return

**Response:**
```json
{
  "executions": [
    {
      "id": 1,
      "user_id": 1,
      "topic_id": "what-is-python",
      "code": "print('Hello')",
      "output": "Hello",
      "error": null,
      "execution_time_ms": 45,
      "success": true,
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "stats": {
    "total": 100,
    "successful": 85,
    "failed": 15,
    "avgExecutionTime": 123.5
  }
}
```

## Installation Requirements

### Server Requirements

1. **Python Installation**
   - Python 3.x must be installed on the server
   - Python must be available in the system PATH
   - Verify with: `python --version`

2. **Node.js Dependencies**
   - Already included in package.json
   - No additional npm packages required

### Database Migration

The database schema is automatically updated when the application starts. The `code_executions` table will be created automatically.

## Usage

### For Students

1. Navigate to any lesson page
2. Locate the "Interactive Code" section
3. Edit the code in the Monaco Editor
4. Click the "Run" button to execute
5. View output in the Output panel below the editor
6. Review execution history in the "Execution History" section

### For Instructors/Admins

1. View execution statistics on the dashboard
2. Monitor student engagement through execution counts
3. Identify common errors through failure statistics
4. Track average execution times to optimize examples

## Troubleshooting

### Python Not Found

**Error:** "Failed to execute Python: spawn python ENOENT"

**Solution:**
- Ensure Python is installed on the server
- Verify Python is in the system PATH
- On Windows, you may need to use `python3` instead of `python`

### Timeout Errors

**Error:** "Execution timed out. Your code took too long to run."

**Solution:**
- This is expected for infinite loops or very long-running code
- Students should optimize their code
- Increase `EXECUTION_TIMEOUT` in `route.ts` if needed (not recommended)

### Security Errors

**Error:** "Import of 'os' is not allowed for security reasons."

**Solution:**
- This is intentional for security
- Students should use only safe Python operations
- Only basic Python constructs are allowed (variables, loops, functions, etc.)

## Future Enhancements

Potential improvements for the feature:

1. **Sandboxed Execution**
   - Use Docker containers for complete isolation
   - Allow more Python libraries safely
   - Better resource limits

2. **Pre-loaded Environments**
   - Pre-import common libraries (math, random, etc.)
   - Provide starter code templates
   - Context-aware code suggestions

3. **Collaborative Features**
   - Share code snippets with classmates
   - Compare solutions
   - Instructor code reviews

4. **Advanced Analytics**
   - Track code patterns and common mistakes
   - Identify learning gaps
   - Personalized suggestions

## Performance Considerations

- Each execution spawns a new Python process
- Concurrent executions are limited by server resources
- Consider implementing a queue system for high-traffic scenarios
- Database logging adds minimal overhead but provides valuable analytics

## License

This feature is part of the LMS platform and follows the same license.
