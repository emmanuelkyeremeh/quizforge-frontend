/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background layers (dark theme)
        bg: {
          primary: '#0D0D12',
          secondary: '#13131A',
          tertiary: '#1A1A24',
          elevated: '#21212D',
          hover: '#26263A',
        },

        // Surface colors - flat naming for utility classes
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          hover: 'rgba(255, 255, 255, 0.05)',
          active: 'rgba(255, 255, 255, 0.08)',
        },

        // Border colors - flat naming
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
        },

        // Text hierarchy
        text: {
          primary: '#F5F5F7',
          secondary: '#A1A1AA',
          tertiary: '#71717A',
          disabled: '#52525B',
          inverse: '#0D0D12',
        },

        // Brand primary
        primary: {
          DEFAULT: '#5E6AD2',
          light: '#7C85DE',
          dark: '#4F5ABD',
          subtle: 'rgba(94, 106, 210, 0.15)',
          'subtle-hover': 'rgba(94, 106, 210, 0.25)',
          glow: 'rgba(94, 106, 210, 0.4)',
        },

        // Accent palette
        accent: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          violet: '#8B5CF6',
        },

        // Semantic
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
      },

      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
      },

      fontSize: {
        'xs': ['11px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        'sm': ['13px', { lineHeight: '20px', letterSpacing: '0' }],
        'base': ['14px', { lineHeight: '22px', letterSpacing: '0' }],
        'lg': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        'xl': ['18px', { lineHeight: '26px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '30px', letterSpacing: '-0.02em' }],
        '3xl': ['32px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        '4xl': ['40px', { lineHeight: '46px', letterSpacing: '-0.02em' }],
        '5xl': ['56px', { lineHeight: '62px', letterSpacing: '-0.03em' }],
      },

      spacing: {
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },

      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },

      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.5)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'glow-primary': '0 0 20px rgba(94, 106, 210, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-subtle': '0 0 40px rgba(94, 106, 210, 0.1)',
      },

      transitionDuration: {
        'fast': '100ms',
        'DEFAULT': '150ms',
        'slow': '300ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'DEFAULT': '12px',
        'lg': '16px',
        'xl': '24px',
      },

      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(94, 106, 210, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(94, 106, 210, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
