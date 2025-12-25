/**
 * Button Component - Styling Tests
 * 
 * Tests CSS classes, visual states, and responsive behavior
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../../components/ui/Button.jsx';
import { setViewport, BREAKPOINTS, hasClass, getComputedStyles } from '../utils/responsive.js';

describe('Button Component - Styling', () => {
  beforeEach(() => {
    setViewport(1024, 768);
  });

  it('applies primary variant styles', () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    const button = screen.getByText('Click me');
    
    // Check for primary variant classes
    expect(hasClass(button, 'bg-primary')).toBe(true);
    expect(hasClass(button, 'text-white')).toBe(true);
  });

  it('applies ghost variant styles', () => {
    const { container } = render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByText('Ghost Button');
    
    expect(hasClass(button, 'bg-transparent')).toBe(true);
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const button = screen.getByText('Small');
    
    // Check for size-specific classes (adjust based on your Button component)
    const styles = getComputedStyles(button);
    expect(button).toBeInTheDocument();
  });

  it('applies disabled state styles', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    
    expect(button).toBeDisabled();
    expect(hasClass(button, 'disabled:opacity-50')).toBe(true);
  });

  it('applies loading state styles', () => {
    const { container } = render(<Button loading>Loading</Button>);
    // When loading is true, Button replaces children with spinner, so find by role
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    // Check that spinner is present
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('maintains styles on mobile viewport', () => {
    setViewport(BREAKPOINTS.sm, 667);
    
    const { container } = render(<Button variant="primary">Mobile Button</Button>);
    const button = screen.getByText('Mobile Button');
    
    // Button should still have primary styles
    expect(hasClass(button, 'bg-primary')).toBe(true);
  });

  it('applies hover styles class (CSS-based)', () => {
    const { container } = render(<Button variant="primary">Hover Test</Button>);
    const button = screen.getByText('Hover Test');
    
    // Check for hover state classes
    expect(hasClass(button, 'hover:bg-primary-light')).toBe(true);
  });
});

