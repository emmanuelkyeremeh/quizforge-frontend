import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase.js';
import { api } from '../lib/api.js';
import { useAuthStore } from '../store/authStore.js';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { user, setUser, userData, setUserData, usage, setUsage, loading: storeLoading, setLoading: setStoreLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user data and usage
        try {
          let profile = null;
          let usageData = null;
          
          try {
            profile = await api.getUserProfile();
          } catch (error) {
            // If user document doesn't exist, create it
            if (error.message?.includes('404') || error.message?.includes('not found')) {
              try {
                await api.createUser({
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName || '',
                  photoURL: firebaseUser.photoURL || '',
                });
                // Retry fetching profile
                profile = await api.getUserProfile();
              } catch (createError) {
                console.error('Error creating user document:', createError);
              }
            } else {
              console.error('Error fetching user profile:', error);
            }
          }
          
          try {
            usageData = await api.getUserUsage();
          } catch (error) {
            // Usage might fail if user document doesn't exist, that's okay
            console.error('Error fetching user usage:', error);
          }
          
          setUserData(profile);
          setUsage(usageData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
          setStoreLoading(false);
        }
      } else {
        setUserData(null);
        setUsage(null);
        setLoading(false);
        setStoreLoading(false);
      }
    });

    return unsubscribe;
  }, [setUser, setUserData, setUsage]);

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully');
      return userCredential.user;
    } catch (error) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const signUp = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in backend
      await api.createUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName || '',
        photoURL: userCredential.user.photoURL || '',
      });
      
      toast.success('Account created successfully');
      return userCredential.user;
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      
      // Create user document if new user (or verify it exists)
      try {
        await api.createUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || '',
          photoURL: userCredential.user.photoURL || '',
        });
      } catch (error) {
        // User might already exist (status 200), that's okay
        // But if it's a different error, log it
        if (!error.message?.includes('already exists') && !error.message?.includes('200')) {
          console.error('Error creating user document:', error);
        }
      }
      
      // Wait a moment for the user document to be created/verified
      // This ensures the auth state change handler can find the user document
      await new Promise(resolve => setTimeout(resolve, 200));
      
      toast.success('Signed in with Google');
      return userCredential.user;
    } catch (error) {
      toast.error(error.message || 'Failed to sign in with Google');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  return {
    user,
    userData,
    usage,
    loading: loading || storeLoading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
  };
};

