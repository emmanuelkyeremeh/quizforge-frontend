import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateQuiz from '../../pages/CreateQuiz.jsx';
import * as useAuth from '../../hooks/useAuth.js';
import * as useQuizGeneration from '../../hooks/useQuizGeneration.js';

vi.mock('../../hooks/useAuth.js');
vi.mock('../../hooks/useQuizGeneration.js');
vi.mock('../../lib/indexedDB.js', () => ({
  hasAnonymousQuiz: vi.fn().mockResolvedValue(false),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CreateQuiz Page', () => {
  beforeEach(() => {
    useAuth.useAuth.mockReturnValue({
      user: { uid: 'user-1' },
      usage: { canCreateQuiz: true },
    });

    useQuizGeneration.useQuizGeneration.mockReturnValue({
      generateQuiz: vi.fn().mockResolvedValue({ id: 'quiz-1' }),
      generating: false,
      progress: '',
    });
  });

  it('renders create quiz form', () => {
    renderWithRouter(<CreateQuiz />);
    expect(screen.getByText('Create New Quiz')).toBeInTheDocument();
    expect(screen.getByText('Generate Quiz')).toBeInTheDocument();
  });

  it('allows entering content', () => {
    renderWithRouter(<CreateQuiz />);
    const textarea = screen.getByPlaceholderText('Paste your source text, transcript, or notes here...');
    fireEvent.change(textarea, { target: { value: 'Test content' } });
    expect(textarea.value).toBe('Test content');
  });

  it('allows adjusting question count', () => {
    renderWithRouter(<CreateQuiz />);
    const slider = screen.getByLabelText(/Number of Questions/i);
    fireEvent.change(slider, { target: { value: '20' } });
    expect(slider.value).toBe('20');
  });

  it('shows loading state when generating', () => {
    useQuizGeneration.useQuizGeneration.mockReturnValue({
      generateQuiz: vi.fn(),
      generating: true,
      progress: 'Generating questions...',
    });

    renderWithRouter(<CreateQuiz />);
    expect(screen.getByText('Generating questions...')).toBeInTheDocument();
  });

  it('disables form when user cannot create quiz', () => {
    useAuth.useAuth.mockReturnValue({
      user: { uid: 'user-1' },
      usage: { canCreateQuiz: false },
    });

    renderWithRouter(<CreateQuiz />);
    const button = screen.getByText('Generate Quiz');
    expect(button).toBeDisabled();
  });
});
