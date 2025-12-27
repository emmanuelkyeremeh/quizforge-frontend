import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShareQuizModal from '../../components/quiz/ShareQuizModal.jsx';
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
vi.mock('../../components/ui/Modal.jsx', () => ({
  Modal: ({ children, isOpen }) => isOpen ? <div data-testid="modal">{children}</div> : null,
  ModalHeader: ({ children }) => <div data-testid="modal-header">{children}</div>,
  ModalBody: ({ children }) => <div data-testid="modal-body">{children}</div>,
  ModalFooter: ({ children }) => <div data-testid="modal-footer">{children}</div>,
}));

describe('Quiz Sharing Flow', () => {
  const mockQuiz = {
    id: 'quiz-1',
    title: 'Test Quiz',
    shareId: 'test-share-id',
    isPublic: false,
    studentInfoFields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
    ],
    settings: {
      showAnswers: true,
      isTimed: false,
      timeLimit: 30,
      pointsPerQuestion: 1,
    },
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        questionText: 'Test question?',
        options: ['A', 'B', 'C', 'D'],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes full sharing flow', async () => {
    const mockOnUpdate = vi.fn().mockResolvedValue({
      ...mockQuiz,
      isPublic: true,
      shareId: 'new-share-id',
    });

    // Step 1: Make quiz public
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={vi.fn()}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );

    // Wait for modal to render - be specific to avoid multiple matches
    await waitFor(() => {
      expect(screen.getByText('Share Quiz')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Find the toggle button for making quiz public
    const toggleButtons = screen.getAllByRole('button');
    const toggle = toggleButtons.find(btn => 
      btn.closest('[class*="flex items-center justify-between"]') &&
      btn.querySelector('span[class*="inline-block"]')
    );
    
    if (toggle) {
      fireEvent.click(toggle);
      // Wait a bit for state update
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Click save to trigger update
      const saveButton = screen.getByText('Save Settings');
      fireEvent.click(saveButton);
    }

    // Wait for update to be called (with timeout)
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalled();
    }, { timeout: 3000 });

    // Step 2: Student takes quiz
    api.api.getPublicQuiz.mockResolvedValue({
      ...mockQuiz,
      isPublic: true,
      shareId: 'new-share-id',
    });

    api.api.submitQuizResponse.mockResolvedValue({
      responseId: 'response-1',
      score: 100,
      correctCount: 1,
      totalQuestions: 1,
      showAnswers: true,
      questionResults: [
        { questionId: 'q1', isCorrect: true, userAnswer: 0, correctAnswer: 0 },
      ],
    });

    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Fill form and submit
    const nameInput = await waitFor(() => screen.getByPlaceholderText(/enter your name/i), { timeout: 3000 });
    fireEvent.change(nameInput, { target: { value: 'Student Name' } });
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('Test question?')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Answer question
    const firstOption = screen.getAllByRole('radio')[0];
    fireEvent.click(firstOption);
    const submitButton = screen.getByText('Submit Quiz');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.api.submitQuizResponse).toHaveBeenCalled();
      expect(screen.getByText(/Quiz Complete/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  }, 15000); // Increase test timeout

  it('respects showAnswers setting', async () => {
    const quizWithHiddenAnswers = {
      ...mockQuiz,
      isPublic: true,
      settings: {
        ...mockQuiz.settings,
        showAnswers: false,
      },
    };

    api.api.getPublicQuiz.mockResolvedValue(quizWithHiddenAnswers);
    api.api.submitQuizResponse.mockResolvedValue({
      responseId: 'response-1',
      score: 100,
      showAnswers: false,
      questionResults: [
        {
          questionId: 'q1',
          isCorrect: true,
          userAnswer: 0,
          // correctAnswer should be undefined when showAnswers is false
        },
      ],
    });

    render(
      <BrowserRouter>
        <TakeQuiz />
      </BrowserRouter>
    );

    // Complete quiz flow
    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    }, { timeout: 5000 });

    const nameInput = await waitFor(() => screen.getByPlaceholderText(/enter your name/i), { timeout: 3000 });
    fireEvent.change(nameInput, { target: { value: 'Student' } });
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('Test question?')).toBeInTheDocument();
    }, { timeout: 5000 });

    fireEvent.click(screen.getAllByRole('radio')[0]);
    const submitButton = screen.getByText('Submit Quiz');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Quiz Complete/i)).toBeInTheDocument();
      // Should not show correct answers
      expect(screen.queryByText(/Correct answer/i)).not.toBeInTheDocument();
    }, { timeout: 5000 });
  }, 15000); // Increase test timeout
});

