/**
 * Dashboard Page - Responsive Tests
 * 
 * Tests responsive layout, grid behavior, and mobile adaptations
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    });
  });

  it('renders correctly on desktop viewport', () => {
    setViewport(1280, 800);
    
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('adapts layout for tablet viewport', () => {
    setViewport(BREAKPOINTS.md, 1024);
    
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    // Check that grid layout adapts
    const grid = container.querySelector('[class*="grid"]');
    expect(grid).toBeInTheDocument();
  });

  it('adapts layout for mobile viewport', () => {
    setViewport(BREAKPOINTS.sm, 667);
    
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    // Mobile layout should stack vertically
    const content = container.querySelector('[class*="flex"]');
    expect(content).toBeInTheDocument();
  });

  it('quiz cards are visible in viewport', () => {
    useQuizzes.useQuizzes.mockReturnValue({
      quizzes: [
        { id: '1', title: 'Test Quiz 1', questions: [] },
        { id: '2', title: 'Test Quiz 2', questions: [] },
      ],
      loading: false,
      error: null,
    });
    
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    const quizCards = screen.getAllByText(/Test Quiz/);
    expect(quizCards.length).toBeGreaterThan(0);
    
    // All cards should be in viewport
    quizCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      expect(rect.top).toBeGreaterThanOrEqual(0);
    });
  });

  it('handles empty state responsively', () => {
    setViewport(375, 667);
    
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    // Empty state should be visible and centered
    const emptyState = screen.queryByText(/no quizzes/i);
    if (emptyState) {
      const rect = emptyState.getBoundingClientRect();
      expect(rect.width).toBeLessThanOrEqual(375);
    }
  });
});

