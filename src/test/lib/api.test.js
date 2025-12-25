import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../../lib/api.js';

// Mock fetch globally
global.fetch = vi.fn();

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('generates quiz from text', async () => {
    const mockResponse = {
      id: 'test-quiz',
      questions: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await api.generateQuiz({
      content: 'Test content',
      questionCount: 10,
    });

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/quiz/generate'),
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('generates quiz from file', async () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const mockResponse = { id: 'test-quiz', questions: [] };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await api.generateQuizFromFile([file], {
      questionCount: 10,
    });

    expect(result).toEqual(mockResponse);
  });

  it('handles API errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Test error' }),
    });

    await expect(
      api.generateQuiz({ content: 'Test' })
    ).rejects.toThrow();
  });

  it('submits quiz response', async () => {
    const mockResponse = {
      responseId: 'response-123',
      score: 100,
      correctCount: 5,
      totalQuestions: 5,
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await api.submitQuizResponse(
      'share-id',
      { name: 'John', email: 'john@example.com' },
      [0, 1, 0, 1, 0]
    );

    expect(result).toEqual(mockResponse);
  });

  it('gets quiz by share ID', async () => {
    const mockQuiz = {
      id: 'quiz-123',
      title: 'Public Quiz',
      questions: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuiz,
    });

    const result = await api.getPublicQuiz('share-id');
    expect(result).toEqual(mockQuiz);
  });
});

