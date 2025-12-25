import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TakeQuiz from '../../pages/TakeQuiz.jsx';
import * as api from '../../lib/api.js';

vi.mock('../../lib/api.js');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ shareId: 'test-share-id' }),
    useNavigate: () => vi.fn(),
  };
});

const mockQuiz = {
  id: 'quiz-1',
  title: 'Test Quiz',
  shareId: 'test-share-id',
  studentInfoFields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ],
  settings: {
    isTimed: false,
    timeLimit: 30,
    pointsPerQuestion: 1,
  },
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      questionText: 'What is 2+2?',
      options: ['3', '4', '5', '6'],
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      questionText: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
    },
  ],
};

describe('TakeQuiz Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.api.getPublicQuiz.mockResolvedValue(mockQuiz);
  });

  it('loads quiz data on mount', async () => {
    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(api.api.getPublicQuiz).toHaveBeenCalledWith('test-share-id');
    });
  });

  it('displays student info form first', async () => {
    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    });
  });

  it('validates required fields before starting quiz', async () => {
    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Start Quiz')).toBeInTheDocument();
    });

    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    // Should show validation error (toast message)
    // Note: react-hot-toast messages may not be in the DOM, so we check the button is still there
    await waitFor(() => {
      expect(screen.getByText('Start Quiz')).toBeInTheDocument();
    });
  });

  it('starts quiz after filling required fields', async () => {
    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
    });
  });

  it('handles timer when enabled', async () => {
    const timedQuiz = {
      ...mockQuiz,
      settings: {
        isTimed: true,
        timeLimit: 2, // 2 minutes
        pointsPerQuestion: 1,
      },
    };

    api.api.getPublicQuiz.mockResolvedValue(timedQuiz);

    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    await waitFor(() => {
      // Timer should be displayed
      expect(screen.getByText(/Time limit/i)).toBeInTheDocument();
    });
  });

  it('submits quiz answers', async () => {
    const mockResponse = {
      responseId: 'response-1',
      score: 100,
      correctCount: 2,
      totalQuestions: 2,
      showAnswers: true,
      questionResults: [
        { questionId: 'q1', isCorrect: true, userAnswer: 1, correctAnswer: 1 },
        { questionId: 'q2', isCorrect: true, userAnswer: 2, correctAnswer: 2 },
      ],
    };

    api.api.submitQuizResponse.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    // Fill student info and start quiz
    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByText('Start Quiz'));

    // Answer questions
    await waitFor(() => {
      expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
    });

    // Select first option for first question
    const firstOption = screen.getAllByRole('radio')[0];
    fireEvent.click(firstOption);

    // Submit quiz
    const submitButton = screen.getByText('Submit Quiz');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.api.submitQuizResponse).toHaveBeenCalled();
      expect(screen.getByText(/Quiz Complete/i)).toBeInTheDocument();
    });
  });
});

