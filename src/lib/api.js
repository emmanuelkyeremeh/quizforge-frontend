/**
 * API client for backend communication
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Get auth token from Firebase
 */
const getAuthToken = async () => {
  const { auth } = await import('./firebase.js');
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

/**
 * Make API request
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || error.error || 'Request failed');
  }

  return response.json();
};

/**
 * API methods
 */
export const api = {
  // Auth
  createUser: (userData) => apiRequest('/api/auth/create-user', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Quiz
  generateQuiz: (data) => apiRequest('/api/quiz/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  generateQuizFromFile: (files, data) => {
    const formData = new FormData();
    
    // Handle both single file (backward compatibility) and multiple files
    const filesArray = Array.isArray(files) ? files : [files];
    filesArray.forEach((file) => {
      formData.append('files', file);
    });
    
    Object.keys(data).forEach(key => {
      if (key !== 'file' && key !== 'files') {
        formData.append(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]);
      }
    });

    return getAuthToken().then(token => {
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return fetch(`${API_URL}/api/quiz/generate-from-file`, {
        method: 'POST',
        headers,
        body: formData,
      }).then(async (response) => {
        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: 'An error occurred' }));
          throw new Error(error.message || error.error || 'Request failed');
        }
        return response.json();
      });
    });
  },

  getQuizzes: () => apiRequest('/api/quiz'),
  getQuiz: (quizId) => apiRequest(`/api/quiz/${quizId}`),
  updateQuiz: (quizId, data) => apiRequest(`/api/quiz/${quizId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteQuiz: (quizId) => apiRequest(`/api/quiz/${quizId}`, {
    method: 'DELETE',
  }),
  duplicateQuiz: (quizId) => apiRequest(`/api/quiz/${quizId}/duplicate`, {
    method: 'POST',
  }),

  // User
  getUserProfile: () => apiRequest('/api/user/profile'),
  getUserUsage: () => apiRequest('/api/user/usage'),
  updateUserProfile: (data) => apiRequest('/api/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Export
  exportQuiz: (quizId, format, options = {}) => {
    return getAuthToken().then(token => {
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return fetch(`${API_URL}/api/export/${format}/${quizId}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      }).then(async (response) => {
        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: 'An error occurred' }));
          throw new Error(error.message || error.error || 'Export failed');
        }
        return response.blob();
      });
    });
  },

  // Public Quiz (no auth required)
  getPublicQuiz: (shareId) => {
    return fetch(`${API_URL}/api/quiz/public/${shareId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || error.error || 'Failed to load quiz');
      }
      return response.json();
    });
  },

  submitQuizResponse: (shareId, studentInfo, answers) => {
    return fetch(`${API_URL}/api/quiz/public/${shareId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentInfo, answers }),
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || error.error || 'Failed to submit quiz');
      }
      return response.json();
    });
  },

  // Get quiz responses (creator only)
  getQuizResponses: (quizId) => apiRequest(`/api/quiz/${quizId}/responses`),

  // Admin
  getAdminMetrics: () => apiRequest('/api/admin/metrics'),
  getAllUsers: (limit = 50, offset = 0) => apiRequest(`/api/admin/users?limit=${limit}&offset=${offset}`),
};

