/**
 * QuizForge Design System
 * Inspired by Linear.app's sophisticated, dark-mode-first aesthetic
 * 
 * Key principles:
 * - Dark theme by default (like Linear)
 * - Subtle depth through gradients and blur, not shadows
 * - Purposeful color use - accent colors highlight, not dominate
 * - Refined typography with precise spacing
 * - Smooth, subtle animations
 */

export const colors = {
  // Background layers (dark to light depth)
  background: {
    primary: '#0D0D12',      // Deepest - main app background
    secondary: '#13131A',    // Cards, panels
    tertiary: '#1A1A24',     // Elevated elements
    elevated: '#21212D',     // Modals, dropdowns
    hover: '#26263A',        // Hover states
  },

  // Surfaces with subtle transparency
  surface: {
    default: 'rgba(255, 255, 255, 0.03)',
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.12)',
  },

  // Text hierarchy
  text: {
    primary: '#F5F5F7',      // Headlines, primary content
    secondary: '#A1A1AA',    // Body text, descriptions
    tertiary: '#71717A',     // Labels, metadata, hints
    disabled: '#52525B',     // Disabled state
    inverse: '#0D0D12',      // Text on light backgrounds
  },

  // Primary brand color (Linear-inspired purple-blue)
  primary: {
    DEFAULT: '#5E6AD2',
    light: '#7C85DE',
    dark: '#4F5ABD',
    subtle: 'rgba(94, 106, 210, 0.15)',
    subtleHover: 'rgba(94, 106, 210, 0.25)',
    glow: 'rgba(94, 106, 210, 0.4)',
  },

  // Accent colors (used sparingly)
  accent: {
    cyan: '#06B6D4',
    emerald: '#10B981',
    amber: '#F59E0B',
    rose: '#F43F5E',
    violet: '#8B5CF6',
  },

  // Semantic colors
  success: {
    DEFAULT: '#10B981',
    subtle: 'rgba(16, 185, 129, 0.15)',
    text: '#34D399',
  },
  warning: {
    DEFAULT: '#F59E0B',
    subtle: 'rgba(245, 158, 11, 0.15)',
    text: '#FBBF24',
  },
  error: {
    DEFAULT: '#EF4444',
    subtle: 'rgba(239, 68, 68, 0.15)',
    text: '#F87171',
  },

  // Gradients (subtle, sophisticated)
  gradients: {
    primary: 'linear-gradient(135deg, #5E6AD2 0%, #8B5CF6 100%)',
    subtle: 'linear-gradient(180deg, rgba(94, 106, 210, 0.08) 0%, rgba(94, 106, 210, 0) 100%)',
    radial: 'radial-gradient(ellipse at top, rgba(94, 106, 210, 0.15) 0%, transparent 50%)',
    mesh: `radial-gradient(at 40% 20%, rgba(94, 106, 210, 0.15) 0px, transparent 50%),
           radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
           radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.05) 0px, transparent 50%)`,
  },
};

export const typography = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Monaco, monospace',
  },

  fontSize: {
    xs: ['11px', { lineHeight: '16px', letterSpacing: '0.01em' }],
    sm: ['13px', { lineHeight: '20px', letterSpacing: '0' }],
    base: ['14px', { lineHeight: '22px', letterSpacing: '0' }],
    lg: ['16px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
    xl: ['18px', { lineHeight: '26px', letterSpacing: '-0.01em' }],
    '2xl': ['24px', { lineHeight: '30px', letterSpacing: '-0.02em' }],
    '3xl': ['32px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
    '4xl': ['40px', { lineHeight: '46px', letterSpacing: '-0.02em' }],
    '5xl': ['56px', { lineHeight: '62px', letterSpacing: '-0.03em' }],
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
};

export const borderRadius = {
  none: '0',
  sm: '4px',
  DEFAULT: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  // Minimal shadows - Linear uses subtle glow instead
  sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
  DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.5)',
  md: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.4)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.4)',
  
  // Glow effects (more Linear-like)
  glow: {
    primary: '0 0 20px rgba(94, 106, 210, 0.3)',
    success: '0 0 20px rgba(16, 185, 129, 0.3)',
    subtle: '0 0 40px rgba(94, 106, 210, 0.1)',
  },
};

export const transitions = {
  fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
  DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const blur = {
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
};

// Z-index scale
export const zIndex = {
  dropdown: 50,
  sticky: 100,
  modal: 200,
  popover: 300,
  tooltip: 400,
  toast: 500,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  blur,
  zIndex,
};

