import { create } from 'zustand';
import { auth } from '../lib/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  userData: null,
  usage: null,
  
  setUser: (user) => set({ user }),
  setUserData: (userData) => set({ userData }),
  setUsage: (usage) => set({ usage }),
  setLoading: (loading) => set({ loading }),
  
  init: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
}));

