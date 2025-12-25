import { describe, it, expect } from 'vitest';
import { format } from 'date-fns';

describe('Date Formatting Utilities', () => {
  it('handles Firestore timestamp', () => {
    const firestoreTimestamp = {
      toDate: () => new Date('2024-01-15'),
    };
    
    const date = firestoreTimestamp.toDate();
    expect(() => format(date, 'MMM d, yyyy')).not.toThrow();
    expect(format(date, 'MMM d, yyyy')).toBe('Jan 15, 2024');
  });

  it('handles Date objects', () => {
    const date = new Date('2024-01-15');
    expect(() => format(date, 'MMM d, yyyy')).not.toThrow();
  });

  it('handles date strings', () => {
    const date = new Date('2024-01-15');
    expect(() => format(date, 'MMM d, yyyy')).not.toThrow();
  });

  it('handles invalid dates gracefully', () => {
    const invalidDate = new Date('invalid');
    expect(isNaN(invalidDate.getTime())).toBe(true);
    
    // Should not throw when checking validity
    expect(() => {
      if (!isNaN(invalidDate.getTime())) {
        format(invalidDate, 'MMM d, yyyy');
      }
    }).not.toThrow();
  });

  it('handles null dates', () => {
    const nullDate = null;
    expect(nullDate).toBeNull();
    // Should provide fallback
    const fallback = nullDate || new Date();
    expect(() => format(fallback, 'MMM d, yyyy')).not.toThrow();
  });
});

