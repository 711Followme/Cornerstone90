import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/config/supabase-config';

// Try to get from environment variables first, fallback to config file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || supabaseConfig.url;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseConfig.anonKey;

// Check if credentials are still placeholder values
if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL_HERE') {
  console.error('⚠️ Supabase URL not configured! Please update src/config/supabase-config.ts');
  console.error('Instructions:');
  console.error('1. Go to https://supabase.com and create a project');
  console.error('2. Go to Settings → API in your Supabase dashboard');
  console.error('3. Copy your credentials to src/config/supabase-config.ts');
}

if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY_HERE') {
  console.error('⚠️ Supabase Anon Key not configured! Please update src/config/supabase-config.ts');
}

console.log('🔧 Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'NOT SET');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable auth session since we're using anonymous users
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'x-client-info': 'cornerstone-90-app'
    }
  },
  db: {
    schema: 'public'
  }
});

// Test connection on initialization
supabase
  .from('profiles')
  .select('count', { count: 'exact', head: true })
  .then(({ error }) => {
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
    } else {
      console.log('✅ Supabase client initialized and connected');
    }
  });

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
