import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '@/lib/supabase';
import { profileService } from '@/services/profileService';

interface AuthContextType {
  userId: string | null;
  profile: Profile | null;
  isLoading: boolean;
  setUserProfile: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('cornerstone_user_id');
    console.log('Initializing auth, stored user ID:', storedUserId);
    
    if (storedUserId) {
      setUserId(storedUserId);
      loadProfile(storedUserId);
    } else {
      // Generate new anonymous user ID
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('Creating new user ID:', newUserId);
      localStorage.setItem('cornerstone_user_id', newUserId);
      setUserId(newUserId);
      setIsLoading(false);
    }
  }, []);

  const loadProfile = async (uid: string) => {
    try {
      console.log('Loading profile for user:', uid);
      const userProfile = await profileService.getProfile(uid);
      console.log('Profile loaded:', userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserProfile = async (name: string, email: string) => {
    if (!userId) {
      console.error('No user ID available');
      return;
    }

    try {
      console.log('Setting profile:', { userId, name, email });
      const updatedProfile = await profileService.upsertProfile(userId, name, email);
      console.log('Profile updated:', updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error setting profile:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('cornerstone_user_id');
    setUserId(null);
    setProfile(null);
    
    // Generate new anonymous user ID
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Creating new user ID after logout:', newUserId);
    localStorage.setItem('cornerstone_user_id', newUserId);
    setUserId(newUserId);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        profile,
        isLoading,
        setUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
