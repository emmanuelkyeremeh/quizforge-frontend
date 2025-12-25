import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api.js';
import { useQuizStore } from '../store/quizStore.js';
import toast from 'react-hot-toast';

export const useQuizzes = () => {
  const { quizzes, setQuizzes, setLoading, setError } = useQuizStore();
  const [loading, setLocalLoading] = useState(false);

  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      setLocalLoading(true);
      const data = await api.getQuizzes();
      setQuizzes(data);
      return data;
    } catch (error) {
      setError(error.message);
      toast.error(error.message || 'Failed to fetch quizzes');
      throw error;
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  }, []); // Zustand setters are stable, no need to include them

  const fetchQuiz = useCallback(async (quizId) => {
    try {
      setLoading(true);
      const data = await api.getQuiz(quizId);
      return data;
    } catch (error) {
      setError(error.message);
      toast.error(error.message || 'Failed to fetch quiz');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []); // Zustand setters are stable

  const updateQuiz = useCallback(async (quizId, data) => {
    try {
      const updated = await api.updateQuiz(quizId, data);
      // Update in local store using functional update
      setQuizzes((currentQuizzes) => 
        currentQuizzes.map(q => q.id === quizId ? { ...q, ...updated } : q)
      );
      toast.success('Quiz updated successfully');
      return updated;
    } catch (error) {
      toast.error(error.message || 'Failed to update quiz');
      throw error;
    }
  }, []); // Using functional update, no need for quizzes dependency

  const deleteQuiz = useCallback(async (quizId) => {
    try {
      await api.deleteQuiz(quizId);
      // Update in local store using functional update
      setQuizzes((currentQuizzes) => currentQuizzes.filter(q => q.id !== quizId));
      toast.success('Quiz deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete quiz');
      throw error;
    }
  }, []); // Using functional update, no need for quizzes dependency

  useEffect(() => {
    // Only fetch if user is authenticated (handled by component)
  }, []);

  return {
    quizzes,
    loading: loading || useQuizStore.getState().loading,
    fetchQuizzes,
    fetchQuiz,
    updateQuiz,
    deleteQuiz,
  };
};

