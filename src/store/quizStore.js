import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  currentQuiz: null,
  quizzes: [],
  loading: false,
  error: null,
  
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  setQuizzes: (quizzes) => set((state) => ({ 
    quizzes: typeof quizzes === 'function' ? quizzes(state.quizzes) : quizzes 
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  clearCurrentQuiz: () => set({ currentQuiz: null }),
}));

