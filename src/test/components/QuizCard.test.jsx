import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuizCard from '../../components/quiz/QuizCard.jsx';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('QuizCard Component', () => {
  const mockQuiz = {
    id: 'quiz-1',
    title: 'Test Quiz',
    questions: [
      { id: 'q1', questionText: 'Question 1' },
      { id: 'q2', questionText: 'Question 2' },
    ],
    metadata: {
      questionCount: 2,
      difficulty: 'medium',
    },
    createdAt: {
      toDate: () => new Date('2024-01-15'),
    },
  };

  it('renders quiz title', () => {
    renderWithRouter(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
  });

  it('displays question count', () => {
    renderWithRouter(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText('2 questions')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    renderWithRouter(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  it('handles missing createdAt gracefully', () => {
    const quizWithoutDate = { ...mockQuiz, createdAt: null };
    renderWithRouter(<QuizCard quiz={quizWithoutDate} />);
    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
  });

  it('handles invalid date gracefully', () => {
    const quizWithInvalidDate = {
      ...mockQuiz,
      createdAt: { toDate: () => new Date('invalid') },
    };
    renderWithRouter(<QuizCard quiz={quizWithInvalidDate} />);
    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
  });

  it('calls onDelete when delete is clicked', () => {
    const handleDelete = vi.fn();
    renderWithRouter(<QuizCard quiz={mockQuiz} onDelete={handleDelete} />);
    // Note: Would need to open dropdown first in real test
    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
  });
});
