/**
 * Responsive Testing Utilities - Tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setViewport, mockMatchMedia, BREAKPOINTS } from './responsive.js';

describe('Responsive Testing Utilities', () => {
  beforeEach(() => {
    // Reset viewport
    setViewport(1024, 768);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets viewport dimensions', () => {
    setViewport(375, 667); // iPhone size
    expect(window.innerWidth).toBe(375);
    expect(window.innerHeight).toBe(667);
  });

  it('mocks matchMedia correctly', () => {
    const mockMedia = mockMatchMedia(vi, true);
    const mediaQuery = mockMedia('(min-width: 768px)');
    
    expect(mediaQuery.matches).toBe(true);
    expect(mediaQuery.media).toBe('(min-width: 768px)');
  });
});

