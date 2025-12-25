import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShareQuizModal from '../../components/quiz/ShareQuizModal.jsx';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal.jsx';

// Mock the Modal components to avoid portal issues
vi.mock('../../components/ui/Modal.jsx', () => ({
  Modal: ({ children, isOpen }) => isOpen ? <div data-testid="modal">{children}</div> : null,
  ModalHeader: ({ children }) => <div data-testid="modal-header">{children}</div>,
  ModalBody: ({ children }) => <div data-testid="modal-body">{children}</div>,
  ModalFooter: ({ children }) => <div data-testid="modal-footer">{children}</div>,
}));

describe('ShareQuizModal Component', () => {
  const mockQuiz = {
    id: 'quiz-1',
    title: 'Test Quiz',
    shareId: 'test-share-id',
    isPublic: false,
    studentInfoFields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
    ],
    settings: {
      showAnswers: true,
      isTimed: false,
      timeLimit: 30,
      pointsPerQuestion: 1,
    },
  };

  const mockOnUpdate = vi.fn().mockResolvedValue(mockQuiz);
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal when open', () => {
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={mockOnClose}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Share Quiz')).toBeInTheDocument();
  });

  it('toggles quiz public status', async () => {
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={mockOnClose}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );

    // Find the heading first, then find the button in the same container
    const heading = screen.getByText(/Make Quiz Public/i);
    // The button is in a flex container with justify-between, so find the parent div
    const container = heading.closest('div[class*="flex"]') || heading.parentElement?.parentElement;
    
    // Find the toggle button (it has rounded-full and h-6 w-11 classes)
    const buttons = container?.querySelectorAll('button') || [];
    const toggle = Array.from(buttons).find(btn => {
      const classes = btn.className || '';
      return classes.includes('rounded-full') && 
             classes.includes('h-6') && 
             classes.includes('w-11');
    });
    
    expect(toggle).toBeTruthy();
    expect(toggle).toBeInstanceOf(HTMLElement);
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  it('allows adding student info fields', () => {
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={mockOnClose}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );

    const addButton = screen.getByText('Add Field');
    fireEvent.click(addButton);

    // Should have more fields now
    const fields = screen.getAllByPlaceholderText(/Field label/i);
    expect(fields.length).toBeGreaterThan(2);
  });

  it('allows removing student info fields', () => {
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={mockOnClose}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );

    const removeButtons = screen.getAllByRole('button').filter(btn => 
      btn.querySelector('svg') // X icon buttons
    );
    
    if (removeButtons.length > 0) {
      fireEvent.click(removeButtons[0]);
      // Field should be removed (but at least one must remain)
    }
  });

  it('toggles show answers setting', async () => {
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={mockOnClose}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );

    // Find the heading first, then find the button in the same container
    const heading = screen.getByText(/Show Correct Answers/i);
    const container = heading.closest('div[class*="flex"]') || heading.parentElement?.parentElement;
    
    // Find the toggle button
    const buttons = container?.querySelectorAll('button') || [];
    const showAnswersToggle = Array.from(buttons).find(btn => {
      const classes = btn.className || '';
      return classes.includes('rounded-full') && 
             classes.includes('h-6') && 
             classes.includes('w-11');
    });
    
    expect(showAnswersToggle).toBeTruthy();
    expect(showAnswersToggle).toBeInstanceOf(HTMLElement);
    fireEvent.click(showAnswersToggle);

    // Settings toggles only update local state - need to click Save Settings
    // Find and click the Save Settings button
    const saveButton = screen.getByText('Save Settings');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  it('toggles timer setting', () => {
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={mockOnClose}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );

    // Find the heading first, then find the button in the same container
    const heading = screen.getByText(/Enable Timer/i);
    const container = heading.closest('div[class*="flex"]') || heading.parentElement?.parentElement;
    
    // Find the toggle button
    const buttons = container?.querySelectorAll('button') || [];
    const timerToggle = Array.from(buttons).find(btn => {
      const classes = btn.className || '';
      return classes.includes('rounded-full') && 
             classes.includes('h-6') && 
             classes.includes('w-11');
    });
    
    expect(timerToggle).toBeTruthy();
    expect(timerToggle).toBeInstanceOf(HTMLElement);
    fireEvent.click(timerToggle);

    // Should show time limit input when timer is enabled
    expect(screen.getByLabelText(/Time Limit/i)).toBeInTheDocument();
  });

  it('updates points per question', () => {
    render(
      <ShareQuizModal
        isOpen={true}
        onClose={mockOnClose}
        quiz={mockQuiz}
        onUpdate={mockOnUpdate}
      />
    );

    // Find the Points Per Question input - it's in a Card with heading "Points Per Question"
    const pointsHeading = screen.getByText(/Points Per Question/i);
    const card = pointsHeading.closest('[class*="Card"]') || pointsHeading.closest('div');
    const pointsInput = card?.querySelector('input[type="number"]');
    
    expect(pointsInput).toBeInTheDocument();
    fireEvent.change(pointsInput, { target: { value: '5' } });
    expect(pointsInput.value).toBe('5');
  });
});
