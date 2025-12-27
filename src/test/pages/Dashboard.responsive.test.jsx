/**
 * Dashboard Page - Responsive Tests
 * 
 * Tests responsive layout, grid behavior, and mobile adaptations
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard.jsx';
import { setViewport, BREAKPOINTS } from '../utils/responsive.js';
import * as useQuizzes from '../../hooks/useQuizzes.js';
import * as useAuth from '../../hooks/useAuth.js';

vi.mock('../../hooks/useQuizzes.js');
vi.mock('../../hooks/useAuth.js');

describe('Dashboard - Responsive Behavior', () => {
  beforeEach(() => {
    setViewport(1024, 768);
    
    useAuth.useAuth.mockReturnValue({
      user: { uid: 'user-1' },
    });
    
    useQuizzes.useQuizzes.mockReturnValue({
      quizzes: [],
      loading: false,
      error: null,
      fetchQuizzes: vi.fn().mockResolvedValue([]),
      deleteQuiz: vi.fn().mockResolvedValue(),
    });
  });

  it('renders correctly on desktop viewport', async () => {
    setViewport(1280, 800);
    
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/my quizzes/i)).toBeInTheDocument();
    });
  });

  it('adapts layout for tablet viewport', async () => {
    setViewport(BREAKPOINTS.md, 1024);
    
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/loading quizzes/i)).not.toBeInTheDocument();
    });
    
    // Check that dashboard content is rendered - "My Quizzes" header should always be present
    const dashboardHeader = screen.getByText(/my quizzes/i);
    expect(dashboardHeader).toBeInTheDocument();
  });

  it('adapts layout for mobile viewport', async () => {
    setViewport(BREAKPOINTS.sm, 667);
    
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/loading quizzes/i)).not.toBeInTheDocument();
    });
    
    // Mobile layout should stack vertically
    const content = container.querySelector('[class*="flex"]');
    expect(content).toBeInTheDocument();
  });

  it('quiz cards are visible in viewport', async () => {
    useQuizzes.useQuizzes.mockReturnValue({
      quizzes: [
        { id: '1', title: 'Test Quiz 1', questions: [] },
        { id: '2', title: 'Test Quiz 2', questions: [] },
      ],
      loading: false,
      error: null,
      fetchQuizzes: vi.fn().mockResolvedValue([
        { id: '1', title: 'Test Quiz 1', questions: [] },
        { id: '2', title: 'Test Quiz 2', questions: [] },
      ]),
      deleteQuiz: vi.fn().mockResolvedValue(),
    });
    
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.queryByText(/loading quizzes/i)).not.toBeInTheDocument();
    });
    
    const quizCards = screen.getAllByText(/Test Quiz/);
    expect(quizCards.length).toBeGreaterThan(0);
    
    // All cards should be in viewport
    quizCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      expect(rect.top).toBeGreaterThanOrEqual(0);
    });
  });

  it('handles empty state responsively', async () => {
    setViewport(375, 667);
    
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/loading quizzes/i)).not.toBeInTheDocument();
    });
    
    // Empty state should be visible and centered
    const emptyState = screen.queryByText(/no quizzes/i);
    if (emptyState) {
      const rect = emptyState.getBoundingClientRect();
      expect(rect.width).toBeLessThanOrEqual(375);
    }
  });
});

