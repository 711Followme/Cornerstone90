import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Code, Upload, FileCode, Lock, Eye, EyeOff, FolderOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminCodeEditor from '@/components/AdminCodeEditor';
import AdminFileManager from '@/components/AdminFileManager';
import AdminUpload from '@/components/AdminUpload';
import ContentGenerator from './ContentGenerator';

const ADMIN_PASSWORD = 'Mens@pp154';
const AUTH_KEY = 'cornerstone90_admin_auth';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    console.log('[Admin] Checking authentication...');
    const authTime = localStorage.getItem(AUTH_KEY);
    if (authTime) {
      const hoursSinceAuth = (Date.now() - parseInt(authTime)) / (1000 * 60 * 60);
      console.log('[Admin] Hours since auth:', hoursSinceAuth);
      if (hoursSinceAuth < 24) {
        console.log('[Admin] Valid session found, authenticating...');
        setIsAuthenticated(true);
      } else {
        console.log('[Admin] Session expired, clearing...');
        localStorage.removeItem(AUTH_KEY);
      }
    } else {
      console.log('[Admin] No existing session');
    }
  }, []);

  const handleLogin = () => {
    const trimmedPassword = password.trim();
    console.log('[Admin] Login attempt #' + (attempts + 1));
    console.log('[Admin] Password entered:', trimmedPassword);
    console.log('[Admin] Expected password:', ADMIN_PASSWORD);
    console.log('[Admin] Match:', trimmedPassword === ADMIN_PASSWORD);
    console.log('[Admin] Password length entered:', trimmedPassword.length);
    console.log('[Admin] Expected length:', ADMIN_PASSWORD.length);
    
    if (trimmedPassword === ADMIN_PASSWORD) {
      console.log('[Admin] ✅ Password correct! Granting access...');
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, Date.now().toString());
      toast({
        title: "Access granted 🔓",
        description: "Welcome to Admin Dashboard",
      });
      setPassword('');
      setAttempts(0);
    } else {
      console.log('[Admin] ❌ Password incorrect');
      setAttempts(attempts + 1);
      toast({
        title: "Access denied ❌",
        description: `Invalid password (Attempt ${attempts + 1})`,
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    console.log('[Admin] Logging out...');
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    setPassword('');
    setAttempts(0);
    toast({
      title: "Logged out",
      description: "Admin session ended",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cornerstone-blue/10 via-cornerstone-warm-white to-cornerstone-charcoal/10 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-2 border-cornerstone-blue/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="text-cornerstone-blue" size={64} strokeWidth={2} />
            </div>
            <CardTitle className="text-2xl text-cornerstone-charcoal">Admin Access</CardTitle>
            <CardDescription className="text-cornerstone-stone">
              Enter admin password to access dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-cornerstone-charcoal">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleLogin();
                    }
                  }}
                  placeholder="Enter admin password"
                  className="pr-10 border-cornerstone-stone/20"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cornerstone-stone hover:text-cornerstone-charcoal"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-cornerstone-stone">
                Password is case-sensitive
              </p>
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-cornerstone-blue hover:bg-cornerstone-blue-dark text-white"
            >
              <Lock className="mr-2" size={18} />
              Access Admin
            </Button>
            
            {attempts > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                <p className="font-semibold">Troubleshooting:</p>
                <ul className="list-disc ml-4 mt-1 space-y-1">
                  <li>Password: Mens@pp154</li>
                  <li>Check for extra spaces</li>
                  <li>Case-sensitive (capital M)</li>
                  <li>Check @ symbol and numbers</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center sticky top-0 z-10 gap-4 border-b border-cornerstone-stone/20 bg-white/95 backdrop-blur px-6 py-4 shadow-sm">
        <SidebarTrigger />
        <Shield className="text-cornerstone-blue" size={24} strokeWidth={2} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-cornerstone-charcoal">Admin Dashboard</h1>
          <p className="text-sm text-cornerstone-stone">Code editor, file management, and content tools</p>
        </div>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50"
        >
          <Lock className="mr-2" size={16} />
          Logout
        </Button>
      </header>

      <main className="flex-1 overflow-auto p-6 bg-cornerstone-warm-white">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="editor" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="editor">
                <Code className="mr-2" size={16} />
                Code Editor
              </TabsTrigger>
              <TabsTrigger value="files">
                <FolderOpen className="mr-2" size={16} />
                File Manager
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2" size={16} />
                Upload
              </TabsTrigger>
              <TabsTrigger value="content">
                <FileCode className="mr-2" size={16} />
                Content Gen
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <AdminCodeEditor />
            </TabsContent>

            <TabsContent value="files">
              <AdminFileManager />
            </TabsContent>

            <TabsContent value="upload">
              <AdminUpload />
            </TabsContent>

            <TabsContent value="content">
              <ContentGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
