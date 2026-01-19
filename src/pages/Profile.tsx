import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Save, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const Profile: React.FC = () => {
  const { profile, setUserProfile, userId } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  // Test Supabase connection on mount
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('🔍 Testing Supabase connection...');
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      
      if (error) {
        console.error('❌ Supabase connection error:', error);
        setConnectionStatus('error');
        toast({
          title: 'Connection Error',
          description: `Cannot connect to database: ${error.message}`,
          variant: 'destructive',
        });
      } else {
        console.log('✅ Supabase connected successfully');
        setConnectionStatus('connected');
      }
    } catch (err) {
      console.error('❌ Connection test failed:', err);
      setConnectionStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 Attempting to save profile...');
    console.log('User ID:', userId);
    console.log('Name:', name);
    console.log('Email:', email);
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('🚀 Calling setUserProfile...');
      await setUserProfile(name, email);
      
      console.log('✅ Profile saved successfully');
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.',
      });
      
      // Verify it was saved
      console.log('🔍 Verifying profile in database...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('❌ Verification failed:', error);
      } else {
        console.log('✅ Profile verified in database:', data);
      }
    } catch (error: any) {
      console.error('❌ Error updating profile:', error);
      console.error('Error details:', {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint
      });
      
      toast({
        title: 'Error',
        description: `Failed to update profile: ${error?.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      {connectionStatus === 'error' && (
        <Card className="border-l-4 border-l-red-600 bg-red-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-red-900">Database Connection Error</p>
              <p className="text-sm text-red-700 mt-1">
                Cannot connect to Supabase. Check browser console (F12) for details.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {connectionStatus === 'connected' && (
        <Card className="border-l-4 border-l-green-600 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            <p className="text-sm text-green-800 font-medium">
              Connected to database
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-cornerstone-blue" size={24} />
            Your Profile
          </CardTitle>
          <CardDescription>
            Complete your profile to participate in Brotherhood chat and connect with others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={16} />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-cornerstone-blue hover:bg-cornerstone-blue-dark"
              disabled={isLoading || connectionStatus === 'error'}
            >
              <Save className="mr-2" size={18} />
              {isLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-cornerstone-blue">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="text-cornerstone-blue" size={20} />
            Your Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-cornerstone-stone">
          <p>• Your name will be visible to other members in Brotherhood chat</p>
          <p>• Your email is private and never shared publicly</p>
          <p>• Your user ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{userId}</code></p>
        </CardContent>
      </Card>

      {/* Debug Info */}
      <Card className="border-l-4 border-l-gray-400 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm text-gray-700">Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-gray-600 space-y-1 font-mono">
          <p>Connection: {connectionStatus}</p>
          <p>User ID: {userId}</p>
          <p>Profile loaded: {profile ? 'Yes' : 'No'}</p>
          {profile && (
            <>
              <p>Current name: {profile.name}</p>
              <p>Current email: {profile.email}</p>
            </>
          )}
          <p className="mt-2 pt-2 border-t border-gray-300">
            Open browser console (F12) to see detailed logs
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
