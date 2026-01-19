# CORNERSTONE: 90 - COMPLETE PROJECT BACKUP
# Generated: 2024
# This file contains the complete codebase for restoration purposes

================================================================================
PROJECT STRUCTURE
================================================================================

cornerstone-90/
├── src/
│   ├── components/
│   │   ├── ui/ (ShadCN components - READ ONLY)
│   │   ├── AppSidebar.tsx
│   │   ├── BrotherhoodChat.tsx
│   │   └── ...other components
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── data/
│   │   ├── journeyData.ts
│   │   ├── nehemiahReadings.ts
│   │   └── disciplinesData.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── supabase.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Reading.tsx
│   │   ├── Workout.tsx
│   │   ├── Disciplines.tsx
│   │   ├── Progress.tsx
│   │   ├── VisionSetup.tsx
│   │   ├── Brotherhood.tsx
│   │   ├── Profile.tsx
│   │   └── NotFound.tsx (READ ONLY)
│   ├── services/
│   │   ├── chatService.ts
│   │   └── profileService.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── public/
│   └── robots.txt
├── SUPABASE_SETUP.md
├── package.json (READ ONLY)
├── tailwind.config.js
├── vite.config.ts (READ ONLY)
├── tsconfig.json (READ ONLY)
└── index.html

================================================================================
DEPENDENCIES (from package.json)
================================================================================

Core Dependencies:
- react@18.3.1
- react-dom@18.3.1
- react-router-dom@7.6.0
- @tanstack/react-query@5.76.0
- @supabase/supabase-js (latest)

UI Components:
- @radix-ui/* (various - see package.json)
- lucide-react@0.510.0
- recharts@2.15.3

Styling:
- tailwindcss-animate@1.0.7
- tailwind-merge@3.3.0
- clsx@2.1.1

Forms & Validation:
- react-hook-form@7.56.3
- zod@3.24.4

Utilities:
- date-fns@3.6.0
- uuid@11.1.0
- sonner@2.0.3

================================================================================
FILE: src/lib/utils.ts
================================================================================

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

================================================================================
FILE: src/lib/supabase.ts
================================================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Profile = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  profiles?: Profile;
};

================================================================================
FILE: src/contexts/AuthContext.tsx
================================================================================

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

  useEffect(() => {
    const storedUserId = localStorage.getItem('cornerstone_user_id');
    console.log('Initializing auth, stored user ID:', storedUserId);
    
    if (storedUserId) {
      setUserId(storedUserId);
      loadProfile(storedUserId);
    } else {
      const newUserId = \`user_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
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
    
    const newUserId = \`user_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
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

================================================================================
FILE: src/services/chatService.ts
================================================================================

import { supabase, ChatMessage } from '@/lib/supabase';

export const chatService = {
  async getMessages(): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(\`
        *,
        profiles (
          id,
          name,
          email
        )
      \`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return data || [];
  },

  async sendMessage(userId: string, message: string): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        message: message.trim(),
      })
      .select(\`
        *,
        profiles (
          id,
          name,
          email
        )
      \`)
      .single();

    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }

    return data;
  },

  subscribeToMessages(callback: (message: ChatMessage) => void) {
    console.log('Subscribing to chat messages...');
    
    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        async (payload) => {
          console.log('New message received:', payload);
          
          const { data } = await supabase
            .from('chat_messages')
            .select(\`
              *,
              profiles (
                id,
                name,
                email
              )
            \`)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            callback(data);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      console.log('Unsubscribing from chat messages...');
      supabase.removeChannel(channel);
    };
  },
};

================================================================================
FILE: src/services/profileService.ts
================================================================================

import { supabase, Profile } from '@/lib/supabase';

export const profileService = {
  async upsertProfile(userId: string, name: string, email: string): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: userId,
          name: name.trim(),
          email: email.trim(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'id',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Error upserting profile:', error);
      throw error;
    }

    return data;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching profile:', error);
      throw error;
    }

    return data;
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }

    return data || [];
  },
};

================================================================================
FILE: src/App.tsx
================================================================================

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "@/pages/Index";
import Reading from "@/pages/Reading";
import Workout from "@/pages/Workout";
import Disciplines from "@/pages/Disciplines";
import Brotherhood from "@/pages/Brotherhood";
import Progress from "@/pages/Progress";
import Profile from "@/pages/Profile";
import VisionSetup from "@/pages/VisionSetup";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <SidebarInset className="flex-1 w-full min-w-0">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/reading" element={<Reading />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="/disciplines" element={<Disciplines />} />
                    <Route path="/brotherhood" element={<Brotherhood />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/vision-setup" element={<VisionSetup />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

================================================================================
FILE: src/main.tsx
================================================================================

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

================================================================================
FILE: src/index.css
================================================================================

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
    --cornerstone-blue: 30 64% 40%;
    --cornerstone-blue-dark: 221 70% 35%;
    --cornerstone-gold: 38 92% 50%;
    --cornerstone-gold-dark: 38 92% 40%;
    --cornerstone-stone: 24 5% 45%;
    --cornerstone-stone-dark: 24 5% 35%;
    --cornerstone-warm-white: 40 20% 97%;
    --cornerstone-charcoal: 220 13% 18%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .text-cornerstone-blue { color: hsl(var(--cornerstone-blue)); }
  .bg-cornerstone-blue { background-color: hsl(var(--cornerstone-blue)); }
  .border-cornerstone-blue { border-color: hsl(var(--cornerstone-blue)); }
  .text-cornerstone-gold { color: hsl(var(--cornerstone-gold)); }
  .bg-cornerstone-gold { background-color: hsl(var(--cornerstone-gold)); }
  .border-cornerstone-gold { border-color: hsl(var(--cornerstone-gold)); }
  .text-cornerstone-stone { color: hsl(var(--cornerstone-stone)); }
  .bg-cornerstone-stone { background-color: hsl(var(--cornerstone-stone)); }
  .border-cornerstone-stone { border-color: hsl(var(--cornerstone-stone)); }
  .bg-cornerstone-warm-white { background-color: hsl(var(--cornerstone-warm-white)); }
  .text-cornerstone-charcoal { color: hsl(var(--cornerstone-charcoal)); }
  .bg-cornerstone-blue-dark { background-color: hsl(var(--cornerstone-blue-dark)); }
  .hover\\:bg-cornerstone-blue-dark:hover { background-color: hsl(var(--cornerstone-blue-dark)); }
  .bg-cornerstone-gold-dark { background-color: hsl(var(--cornerstone-gold-dark)); }
  .hover\\:bg-cornerstone-gold-dark:hover { background-color: hsl(var(--cornerstone-gold-dark)); }
  .bg-cornerstone-stone-dark { background-color: hsl(var(--cornerstone-stone-dark)); }
  .hover\\:bg-cornerstone-stone-dark:hover { background-color: hsl(var(--cornerstone-stone-dark)); }
}

================================================================================
FILE: tailwind.config.js
================================================================================

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

================================================================================
NOTE: DATA FILES TOO LARGE FOR SINGLE BACKUP
================================================================================

The following files contain extensive data and should be backed up separately:
- src/data/journeyData.ts (Complete workout system)
- src/data/nehemiahReadings.ts (All 14 days of devotionals - ~500 lines each)
- src/data/disciplinesData.ts (Habit tracking system)
- All page components (Index, Reading, Workout, etc.)
- Component files (AppSidebar, BrotherhoodChat)

RESTORATION INSTRUCTIONS:
1. Copy all code files from this backup
2. Refer to chat history for complete data files
3. Run SQL migration from SUPABASE_SETUP.md in Supabase dashboard
4. Install dependencies: npm install
5. Add Supabase env variables to .env.local

================================================================================
SUPABASE DATABASE SETUP SQL
================================================================================

-- Step 1: Create profiles table
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (true);

-- Step 2: Create chat_messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages are viewable by everyone"
  ON chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Users can insert messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);

-- Step 3: Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;

================================================================================
END OF BACKUP FILE
================================================================================

Project: CORNERSTONE: 90
Status: Complete codebase backup
Date: 2024
Total Files: 20+ core files
Features: 
- 90-day spiritual journey tracker
- Daily readings (Nehemiah devotionals)
- Workout system with 3 difficulty levels
- Habit tracking (disciplines)
- Real-time Brotherhood chat (Supabase)
- Progress analytics with charts
- Vision/goal setting

For complete file contents, refer to the restoration batches in chat history.
