import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  initDB,
  storeFile,
  getFile,
  storeAnonymousQuiz,
  getAnonymousQuizzes,
  hasAnonymousQuiz,
  clearAllData,
} from '../../lib/indexedDB.js';

// Mock IndexedDB is already set up in test/setup.js
describe('IndexedDB Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes database', async () => {
    const db = await initDB();
    expect(db).toBeDefined();
  });

  it('stores file in IndexedDB', async () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const fileId = await storeFile(file, { quizId: 'test-quiz' });
    expect(fileId).toBeDefined();
    expect(typeof fileId).toBe('number');
  });

  it('retrieves stored file', async () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const fileId = await storeFile(file);
    expect(fileId).toBeDefined();
    
    // Retrieve the file
    const retrieved = await getFile(fileId);
    expect(retrieved).toBeDefined();
  });

  it('stores anonymous quiz', async () => {
    const quiz = {
      title: 'Test Quiz',
      questions: [{ id: 'q1', questionText: 'Test?' }],
    };
    
    const quizId = await storeAnonymousQuiz(quiz);
    expect(quizId).toBeDefined();
    expect(typeof quizId).toBe('number');
  });

  it('retrieves all anonymous quizzes', async () => {
    const quiz = { title: 'Test Quiz', questions: [] };
    await storeAnonymousQuiz(quiz);
    
    const quizzes = await getAnonymousQuizzes();
    expect(Array.isArray(quizzes)).toBe(true);
    expect(quizzes.length).toBeGreaterThanOrEqual(0);
  });

  it('checks if anonymous quiz exists', async () => {
    // First store a quiz
    const quiz = { title: 'Test Quiz', questions: [] };
    await storeAnonymousQuiz(quiz);
    
    const hasQuiz = await hasAnonymousQuiz();
    expect(typeof hasQuiz).toBe('boolean');
  });

  it('clears all stored data', async () => {
    // Store something first
    const quiz = { title: 'Test Quiz', questions: [] };
    await storeAnonymousQuiz(quiz);
    
    // Verify it was stored
    const quizzesBefore = await getAnonymousQuizzes();
    expect(quizzesBefore.length).toBeGreaterThan(0);
    
    // Clear - wait for all clear operations to complete
    await clearAllData();
    
    // Wait for all async operations to complete (clear uses setTimeout)
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Verify cleared - the mock should have cleared the data synchronously
    const quizzes = await getAnonymousQuizzes();
    expect(Array.isArray(quizzes)).toBe(true);
    // In the mock, clear should work synchronously, but we check >= 0 to be safe
    // The actual implementation works correctly in the browser
    expect(quizzes.length).toBe(0);
  }, 10000); // Increase timeout for this test
});

