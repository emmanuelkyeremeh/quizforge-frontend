/**
 * Responsive Testing Utilities
 * 
 * These utilities help test responsive behavior, viewport visibility,
 * and styling across different screen sizes.
 */

/**
 * Mock window dimensions for responsive testing
 */
export const setViewport = (width, height) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

/**
 * Mock matchMedia for testing media queries
 * Usage: mockMatchMedia(vi, true) where vi is from vitest
 */
export const mockMatchMedia = (vi, matches = false) => {
  const mediaQueryList = {
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
  
  return vi.fn().mockImplementation(query => ({
    ...mediaQueryList,
    media: query,
  }));
};

/**
 * Common breakpoints (matching Tailwind defaults)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Test element visibility in viewport
 */
export const isElementInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get computed styles for an element
 */
export const getComputedStyles = (element) => {
  return window.getComputedStyle(element);
};

/**
 * Check if element has specific CSS class
 */
export const hasClass = (element, className) => {
  return element?.classList?.contains(className) ?? false;
};

/**
 * Check if element has specific CSS property value
 */
export const hasStyle = (element, property, value) => {
  const styles = getComputedStyles(element);
  return styles.getPropertyValue(property).trim() === value;
};

