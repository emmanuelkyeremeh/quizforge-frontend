# Styling, Visibility, and Responsive Testing

This document explains how to test styling, component visibility, and responsive behavior in QuizForge.

## Overview

We can test:
- ✅ **CSS Classes**: Verify correct classes are applied
- ✅ **Responsive Behavior**: Test different viewport sizes
- ✅ **Visibility**: Check if elements are in viewport
- ✅ **Layout Adaptations**: Verify mobile/tablet/desktop layouts
- ⚠️ **Visual Appearance**: Limited (requires visual regression tools)

## Testing Utilities

### Responsive Testing (`utils/responsive.test.js`)

```javascript
import { setViewport, BREAKPOINTS, isElementInViewport } from '../utils/responsive.js';

// Set viewport size
setViewport(375, 667); // Mobile
setViewport(1024, 768); // Desktop

// Check if element is visible
const button = screen.getByText('Click me');
expect(isElementInViewport(button)).toBe(true);
```

### CSS Class Testing

```javascript
import { hasClass } from '../utils/responsive.test.js';

const button = screen.getByText('Submit');
expect(hasClass(button, 'bg-primary')).toBe(true);
expect(hasClass(button, 'hover:bg-primary-light')).toBe(true);
```

### Computed Styles

```javascript
import { getComputedStyles } from '../utils/responsive.test.js';

const element = screen.getByText('Test');
const styles = getComputedStyles(element);
expect(styles.display).toBe('flex');
```

## Example Tests

### 1. Button Styling Test
See: `components/Button.styles.test.jsx`
- Tests variant classes (primary, ghost, etc.)
- Tests size classes
- Tests disabled/loading states
- Tests responsive behavior

### 2. Modal Visibility Test
See: `components/Modal.visibility.test.jsx`
- Tests modal visibility
- Tests viewport positioning
- Tests scroll locking
- Tests max-height constraints

### 3. Dashboard Responsive Test
See: `pages/Dashboard.responsive.test.jsx`
- Tests layout at different viewport sizes
- Tests grid adaptations
- Tests element visibility

## Running Styling Tests

```bash
# Run all styling tests
npm test -- styling

# Run specific test file
npm test -- Button.styles

# Run with coverage
npm test -- --coverage
```

## Limitations

### What We CAN Test:
- ✅ CSS classes are applied correctly
- ✅ Elements are in the DOM
- ✅ Responsive breakpoints trigger
- ✅ Viewport dimensions
- ✅ Element visibility (in viewport)
- ✅ Computed styles (limited)

### What We CANNOT Test (without additional tools):
- ❌ Actual visual appearance (colors, spacing visually)
- ❌ Pixel-perfect layouts
- ❌ Cross-browser rendering differences
- ❌ Animation timing/visuals
- ❌ Font rendering

## Advanced Visual Testing

For pixel-perfect visual testing, consider:

### 1. **Chromatic** (Recommended)
```bash
npm install --save-dev chromatic
```
- Visual regression testing
- Screenshot comparisons
- Cross-browser testing

### 2. **Playwright Visual Comparisons**
```bash
npm install --save-dev @playwright/test
```
- Full browser testing
- Screenshot comparisons
- Responsive testing across devices

### 3. **Percy**
- Visual regression testing
- CI/CD integration
- Cross-browser support

## Best Practices

1. **Test CSS Classes, Not Visuals**: Focus on class application
2. **Test Responsive Breakpoints**: Use `setViewport()` for different sizes
3. **Test Visibility**: Ensure important elements are in viewport
4. **Test Accessibility**: Use `getByRole`, `getByLabelText` for semantic queries
5. **Mock Media Queries**: Use `mockMatchMedia()` for responsive behavior

## Example: Testing a Responsive Component

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { setViewport, BREAKPOINTS } from '../utils/responsive.js';
import MyComponent from './MyComponent.jsx';

describe('MyComponent - Responsive', () => {
  it('shows mobile layout on small screens', () => {
    setViewport(BREAKPOINTS.sm, 667);
    render(<MyComponent />);
    
    // Mobile-specific elements should be visible
    expect(screen.getByText('Mobile Menu')).toBeInTheDocument();
  });

  it('shows desktop layout on large screens', () => {
    setViewport(BREAKPOINTS.lg, 1024);
    render(<MyComponent />);
    
    // Desktop-specific elements should be visible
    expect(screen.getByText('Desktop Nav')).toBeInTheDocument();
  });
});
```

## Common Breakpoints

```javascript
export const BREAKPOINTS = {
  sm: 640,   // Mobile
  md: 768,   // Tablet
  lg: 1024,  // Desktop
  xl: 1280,  // Large Desktop
  '2xl': 1536, // Extra Large
};
```

## Tips

1. **Reset Viewport**: Always reset viewport in `afterEach` or `beforeEach`
2. **Test Edge Cases**: Test at breakpoint boundaries (639px, 640px, etc.)
3. **Test Scroll Behavior**: Check if scrollable content works correctly
4. **Test Overflow**: Ensure content doesn't overflow viewport
5. **Test Touch Targets**: On mobile, ensure buttons are at least 44x44px

