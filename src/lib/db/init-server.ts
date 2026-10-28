import { initializeDatabase } from './schema';

// Initialize database - this should be called in a server component or API route
export async function initDb() {
  try {
    initializeDatabase();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}
