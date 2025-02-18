// lib/exceptions.ts

export class DatabaseConnectionError extends Error {
  constructor(message?: string) {
    super(message || 'Database connection error');
    this.name = 'DatabaseConnectionError';
  }
}
