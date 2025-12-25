import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth.js';
import * as firebaseAuth from 'firebase/auth';
import * as api from '../../lib/api.js';

// Mock Firebase Auth - use factory function to avoid hoisting issues
vi.mock('firebase/auth', () => {
  const mockOnAuthStateChanged = vi.fn((callback) => {
    // Simulate initial auth state
    callback(null);
    return () => {}; // Return unsubscribe function
  });
  
  return {
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
    onAuthStateChanged: mockOnAuthStateChanged,
  };
});

// Mock API
vi.mock('../../lib/api.js', () => ({
  api: {
    createUser: vi.fn(),
    getUserProfile: vi.fn(),
    getUserUsage: vi.fn(),
  },
}));

// Mock Firebase config
vi.mock('../../lib/firebase.js', () => {
  const mockOnAuthStateChanged = vi.fn((callback) => {
    callback(null);
    return () => {};
  });
  
  return {
    auth: {
      onAuthStateChanged: mockOnAuthStateChanged,
      currentUser: null,
    },
    googleProvider: {},
  };
});

// Mock Zustand store
vi.mock('../../store/authStore.js', () => ({
  useAuthStore: vi.fn(() => ({
    user: null,
    userData: null,
    usage: null,
    setUser: vi.fn(),
    setUserData: vi.fn(),
    setUsage: vi.fn(),
    loading: false,
    setLoading: vi.fn(),
  })),
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with null user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it('handles sign in with email and password', async () => {
    const mockUser = { uid: 'user-1', email: 'test@example.com' };
    firebaseAuth.signInWithEmailAndPassword.mockResolvedValue({
      user: mockUser,
    });

    const { result } = renderHook(() => useAuth());
    
    await result.current.signIn('test@example.com', 'password123');
    
    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      'test@example.com',
      'password123'
    );
  });

  it('handles sign up', async () => {
    const mockUser = { uid: 'user-1', email: 'test@example.com' };
    firebaseAuth.createUserWithEmailAndPassword.mockResolvedValue({
      user: mockUser,
    });
    api.api.createUser.mockResolvedValue({});

    const { result } = renderHook(() => useAuth());
    
    await result.current.signUp('test@example.com', 'password123', 'Test User');
    
    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(api.api.createUser).toHaveBeenCalled();
  });

  it('handles Google sign in', async () => {
    const mockUser = { uid: 'user-1', email: 'test@example.com' };
    firebaseAuth.signInWithPopup.mockResolvedValue({
      user: mockUser,
    });
    api.api.createUser.mockResolvedValue({});

    const { result } = renderHook(() => useAuth());
    
    await result.current.signInWithGoogle();
    
    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled();
  });
});
