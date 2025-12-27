import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

  afterEach(() => {
    // Component cleanup should handle intervals via useEffect cleanup
    // No manual cleanup needed - React will handle it on unmount
  });

  it('loads quiz data on mount', async () => {
    const { unmount } = render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(api.api.getPublicQuiz).toHaveBeenCalledWith('test-share-id');
    }, { timeout: 5000 });
    
    unmount(); // Clean up component
  });

  it('displays student info form first', async () => {
    const { unmount } = render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    unmount(); // Clean up component
  });

  it('validates required fields before starting quiz', async () => {
    const { unmount } = render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Start Quiz')).toBeInTheDocument();
    }, { timeout: 5000 });

    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    // After clicking without filling fields, the form should still be visible
    // (quiz should not have started) - check immediately, no need to wait
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    
    unmount(); // Clean up component
  }, 10000);

  it('starts quiz after filling required fields', async () => {
    const { unmount } = render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    }, { timeout: 5000 });

    const nameInput = await waitFor(() => screen.getByPlaceholderText(/enter your name/i), { timeout: 3000 });
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
    }, { timeout: 5000 });
    
    unmount(); // Clean up component and intervals
  }, 15000);

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

    const { unmount } = render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    }, { timeout: 5000 });

    const nameInput = await waitFor(() => screen.getByPlaceholderText(/enter your name/i), { timeout: 3000 });
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    await waitFor(() => {
      // Timer should be displayed - check for time format MM:SS
      const timerElement = screen.queryByText(/\d{2}:\d{2}/);
      expect(timerElement || screen.getByText(/Time limit/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    unmount(); // Clean up component and intervals
  }, 15000);

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

    const { unmount } = render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    // Fill student info and start quiz
    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    }, { timeout: 5000 });

    const nameInput = await waitFor(() => screen.getByPlaceholderText(/enter your name/i), { timeout: 3000 });
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    // Answer questions
    await waitFor(() => {
      expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Select first option for first question
    const firstOption = screen.getAllByRole('radio')[0];
    fireEvent.click(firstOption);

    // Submit quiz
    const submitButton = screen.getByText('Submit Quiz');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.api.submitQuizResponse).toHaveBeenCalled();
      expect(screen.getByText(/Quiz Results|Quiz Complete/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    unmount(); // Clean up component
  }, 15000);
});

