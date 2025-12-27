import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { api } from '../../lib/api.js';
import CreateQuiz from '../../pages/CreateQuiz.jsx';
import * as useAuth from '../../hooks/useAuth.js';
import * as useQuizGeneration from '../../hooks/useQuizGeneration.js';

vi.mock('../../hooks/useAuth.js');
vi.mock('../../hooks/useQuizGeneration.js');
vi.mock('../../lib/api.js');
vi.mock('../../lib/indexedDB.js', () => ({
  hasAnonymousQuiz: vi.fn().mockResolvedValue(false),
  storeFile: vi.fn().mockResolvedValue(1),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Quiz Generation Flow', () => {
  beforeEach(() => {
    useAuth.useAuth.mockReturnValue({
      user: { uid: 'user-1' },
      usage: { canCreateQuiz: true },
    });

    useQuizGeneration.useQuizGeneration.mockReturnValue({
      generateQuiz: vi.fn().mockResolvedValue({
        id: 'quiz-1',
        title: 'Test Quiz',
        questions: [],
      }),
      generating: false,
      progress: '',
    });
  });

  it('completes full quiz generation flow', async () => {
    const generateQuiz = vi.fn().mockResolvedValue({
      id: 'quiz-1',
      title: 'Test Quiz',
      questions: [],
    });

    useQuizGeneration.useQuizGeneration.mockReturnValue({
      generateQuiz,
      generating: false,
      progress: '',
    });

    renderWithRouter(<CreateQuiz />);

    // Enter content
    const textarea = screen.getByPlaceholderText('Paste your source text, transcript, or notes here...');
    fireEvent.change(textarea, { target: { value: 'Test content for quiz' } });

    // Set question count
    const slider = screen.getByLabelText(/Number of Questions/i);
    fireEvent.change(slider, { target: { value: '10' } });

    // Submit form
    const submitButton = screen.getByText('Generate Quiz');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(generateQuiz).toHaveBeenCalledWith(
        'Test content for quiz',
        expect.objectContaining({
          questionCount: 10,
          types: expect.any(Array),
          difficulty: expect.any(String),
        }),
        expect.any(Array) // files array (empty when no files uploaded)
      );
    });
  });

  it('handles file upload flow', async () => {
    const generateQuiz = vi.fn().mockResolvedValue({
      id: 'quiz-1',
      questions: [],
    });

    useQuizGeneration.useQuizGeneration.mockReturnValue({
      generateQuiz,
      generating: false,
      progress: '',
    });

    renderWithRouter(<CreateQuiz />);

    // Simulate file upload
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = document.querySelector('input[type="file"]');
    
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    // Wait for file to be processed
    await waitFor(() => {
      expect(screen.queryByText('test.pdf')).toBeInTheDocument();
    });
  });
});

