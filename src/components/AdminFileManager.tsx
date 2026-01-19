import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Download, RefreshCw, File, Folder, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fileSystemService, FileItem } from '@/services/fileSystemService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminFileManager = () => {
  const { toast } = useToast();
  const [hasAccess, setHasAccess] = useState(false);
  const [directoryName, setDirectoryName] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setHasAccess(fileSystemService.hasDirectoryAccess());
    setDirectoryName(fileSystemService.getDirectoryName() || '');
  }, []);

  const handleRequestAccess = async () => {
    try {
      const handle = await fileSystemService.requestDirectoryAccess();
      if (handle) {
        setHasAccess(true);
        setDirectoryName(handle.name);
        await loadDirectory('');
        toast({
          title: "Directory access granted ✅",
          description: `Connected to: ${handle.name}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error accessing directory",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const loadDirectory = async (path: string) => {
    setIsLoading(true);
    try {
      const items = await fileSystemService.listDirectory(path);
      setFiles(items);
      setCurrentPath(path);
      console.log('[FileManager] Loaded:', path, items.length, 'items');
    } catch (error: any) {
      toast({
        title: "Error loading directory",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (item: FileItem) => {
    if (item.type === 'directory') {
      loadDirectory(item.path);
    }
  };

  const handleGoUp = () => {
    const parts = currentPath.split('/').filter(p => p);
    parts.pop();
    const parentPath = parts.join('/');
    loadDirectory(parentPath);
  };

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'directory') {
      return <Folder className="text-cornerstone-gold" size={20} />;
    }
    return <File className="text-cornerstone-blue" size={20} />;
  };

  const handleDownloadAllCode = () => {
    toast({
      title: "Feature coming soon",
      description: "ZIP download will be available in next update",
    });
  };

  if (!hasAccess) {
    return (
      <Card className="bg-white border border-cornerstone-stone/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
            <FolderOpen className="text-cornerstone-gold" size={24} />
            File Manager
          </CardTitle>
          <CardDescription className="text-cornerstone-stone">
            Browse and manage project files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <FolderOpen className="h-4 w-4" />
            <AlertTitle>Directory Access Required</AlertTitle>
            <AlertDescription>
              <p className="mb-3">
                Grant access to your project directory to browse files.
              </p>
              <Button 
                onClick={handleRequestAccess}
                className="bg-cornerstone-gold hover:bg-cornerstone-gold/90 text-white"
              >
                <FolderOpen className="mr-2" size={18} />
                Open Project Directory
              </Button>
            </AlertDescription>
          </Alert>

          <div className="bg-cornerstone-stone/5 rounded-lg p-4 border border-cornerstone-stone/10">
            <h3 className="font-semibold text-cornerstone-charcoal mb-3">Expected Project Structure</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="text-cornerstone-blue">📁 cornerstone-90/</div>
              <div className="ml-4 text-cornerstone-charcoal">📁 src/</div>
              <div className="ml-8 text-cornerstone-stone">📁 pages/</div>
              <div className="ml-8 text-cornerstone-stone">📁 components/</div>
              <div className="ml-8 text-cornerstone-stone">📁 data/</div>
              <div className="ml-4 text-cornerstone-charcoal">📁 public/</div>
              <div className="ml-4 text-cornerstone-charcoal">📄 package.json</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-cornerstone-stone/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
          <FolderOpen className="text-cornerstone-gold" size={24} />
          File Manager: {directoryName}
        </CardTitle>
        <CardDescription className="text-cornerstone-stone">
          Browsing: /{currentPath || 'root'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Navigation */}
        <div className="flex gap-2">
          {currentPath && (
            <Button
              onClick={handleGoUp}
              variant="outline"
              size="sm"
              className="border-cornerstone-stone/30"
            >
              ← Go Up
            </Button>
          )}
          <Button
            onClick={() => loadDirectory(currentPath)}
            variant="outline"
            size="sm"
            className="border-cornerstone-stone/30"
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={16} />
            Refresh
          </Button>
        </div>

        {/* File List */}
        <div className="border border-cornerstone-stone/20 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-cornerstone-stone">
              <RefreshCw className="animate-spin mx-auto mb-2" size={32} />
              Loading files...
            </div>
          ) : files.length === 0 ? (
            <div className="p-8 text-center text-cornerstone-stone">
              <AlertCircle className="mx-auto mb-2" size={32} />
              No files found in this directory
            </div>
          ) : (
            <div className="divide-y divide-cornerstone-stone/10">
              {files.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigate(item)}
                  className={`flex items-center gap-3 p-3 hover:bg-cornerstone-stone/5 ${
                    item.type === 'directory' ? 'cursor-pointer' : ''
                  } transition-colors`}
                >
                  {getFileIcon(item)}
                  <div className="flex-1">
                    <div className="font-medium text-cornerstone-charcoal">{item.name}</div>
                    <div className="text-xs text-cornerstone-stone">
                      {item.type === 'directory' ? 'Directory' : `File • ${item.extension?.toUpperCase() || 'TXT'}`}
                    </div>
                  </div>
                  {item.type === 'directory' && (
                    <div className="text-cornerstone-stone">→</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleDownloadAllCode}
            className="bg-cornerstone-gold hover:bg-cornerstone-gold/90 text-white"
          >
            <Download className="mr-2" size={18} />
            Download All (ZIP) - Coming Soon
          </Button>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Real File System Access</AlertTitle>
          <AlertDescription className="text-sm">
            <p>You're browsing files on your local computer. Click directories to navigate, view file types and structure.</p>
            <p className="mt-2">
              <strong>Note:</strong> This accesses your local project files, not the deployed website.
            </p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AdminFileManager;
