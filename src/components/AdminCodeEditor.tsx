import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Code, Save, Download, FolderOpen, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fileSystemService } from '@/services/fileSystemService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminCodeEditor = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [hasDirectoryAccess, setHasDirectoryAccess] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [directoryName, setDirectoryName] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const supported = fileSystemService.isSupported();
    setIsSupported(supported);
    setHasDirectoryAccess(fileSystemService.hasDirectoryAccess());
    setDirectoryName(fileSystemService.getDirectoryName() || '');
    
    if (!supported) {
      console.warn('[Admin] File System Access API not supported');
    }
  }, []);

  const handleRequestDirectoryAccess = async () => {
    try {
      const handle = await fileSystemService.requestDirectoryAccess();
      if (handle) {
        setHasDirectoryAccess(true);
        setDirectoryName(handle.name);
        toast({
          title: "Directory access granted ✅",
          description: `Connected to: ${handle.name}`,
        });
      } else {
        toast({
          title: "Access cancelled",
          description: "Directory access was not granted",
          variant: "destructive"
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

  const handleReadFile = async (path: string) => {
    if (!path) return;
    
    try {
      const content = await fileSystemService.readFile(path);
      setFileContent(content);
      setFileName(path.split('/').pop() || '');
      setSelectedFile(path);
      setIsDirty(false);
      
      toast({
        title: "File loaded ✅",
        description: `${path} (${content.length} characters)`,
      });
    } catch (error: any) {
      toast({
        title: "Error reading file",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSaveFile = async () => {
    if (!selectedFile && !fileName) {
      toast({
        title: "No file selected",
        description: "Please select a file to save",
        variant: "destructive"
      });
      return;
    }

    const pathToSave = selectedFile || fileName;

    try {
      const success = await fileSystemService.writeFile(pathToSave, fileContent);
      if (success) {
        setIsDirty(false);
        toast({
          title: "File saved ✅",
          description: `${pathToSave} has been updated`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error saving file",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleOpenSingleFile = async () => {
    try {
      const result = await fileSystemService.openFilePicker();
      if (result) {
        setFileContent(result.content);
        setFileName(result.handle.name);
        setSelectedFile('');
        setIsDirty(false);
        
        toast({
          title: "File opened ✅",
          description: `${result.handle.name} (${result.content.length} characters)`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error opening file",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDownloadFile = () => {
    if (!fileContent) {
      toast({
        title: "No content to download",
        variant: "destructive"
      });
      return;
    }

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (fileName || selectedFile.split('/').pop() || 'file.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded ✅",
      description: `Downloaded successfully`,
    });
  };

  const handleContentChange = (newContent: string) => {
    setFileContent(newContent);
    setIsDirty(true);
  };

  if (!isSupported) {
    return (
      <Card className="bg-white border border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle size={24} />
            Browser Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>File System Access API Not Available</AlertTitle>
            <AlertDescription>
              Your browser doesn't support the File System Access API. Please use:
              <ul className="list-disc ml-6 mt-2">
                <li>Google Chrome (v86+)</li>
                <li>Microsoft Edge (v86+)</li>
                <li>Opera (v72+)</li>
              </ul>
              <p className="mt-2 text-sm">
                Firefox and Safari do not currently support this API.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-cornerstone-stone/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
          <Code className="text-cornerstone-blue" size={24} />
          Production Code Editor
        </CardTitle>
        <CardDescription className="text-cornerstone-stone">
          Real file system access - edit actual project files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Directory Access */}
        {!hasDirectoryAccess ? (
          <Alert>
            <FolderOpen className="h-4 w-4" />
            <AlertTitle>Directory Access Required</AlertTitle>
            <AlertDescription>
              <p className="mb-3">
                Grant access to your project directory to read and edit files directly.
              </p>
              <Button 
                onClick={handleRequestDirectoryAccess}
                className="bg-cornerstone-blue hover:bg-cornerstone-blue-dark text-white"
              >
                <FolderOpen className="mr-2" size={18} />
                Open Project Directory
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Connected to: {directoryName}</AlertTitle>
            <AlertDescription>
              You can now read and write files directly. Changes save to your local file system.
            </AlertDescription>
          </Alert>
        )}

        {/* File Selection */}
        <div className="space-y-2">
          <Label className="text-cornerstone-charcoal">Select File</Label>
          <div className="flex gap-2">
            <select
              value={selectedFile}
              onChange={(e) => handleReadFile(e.target.value)}
              disabled={!hasDirectoryAccess}
              className="flex-1 px-3 py-2 border border-cornerstone-stone/20 rounded-lg bg-white text-cornerstone-charcoal disabled:opacity-50"
            >
              <option value="">-- Select a file --</option>
              <optgroup label="Pages">
                <option value="src/pages/Index.tsx">Index.tsx</option>
                <option value="src/pages/DailyReading.tsx">DailyReading.tsx</option>
                <option value="src/pages/Workout.tsx">Workout.tsx</option>
                <option value="src/pages/Profile.tsx">Profile.tsx</option>
                <option value="src/pages/Admin.tsx">Admin.tsx</option>
              </optgroup>
              <optgroup label="Data">
                <option value="src/data/nehemiahReadings.ts">nehemiahReadings.ts</option>
                <option value="src/data/journeyData.ts">journeyData.ts</option>
                <option value="src/data/disciplinesData.ts">disciplinesData.ts</option>
                <option value="src/data/workoutData.ts">workoutData.ts</option>
              </optgroup>
              <optgroup label="Components">
                <option value="src/components/NotificationSettings.tsx">NotificationSettings.tsx</option>
                <option value="src/App.tsx">App.tsx</option>
              </optgroup>
              <optgroup label="Config">
                <option value="tailwind.config.js">tailwind.config.js</option>
                <option value="src/index.css">index.css</option>
              </optgroup>
            </select>
            <Button 
              onClick={handleOpenSingleFile}
              variant="outline"
              className="border-cornerstone-stone/30"
            >
              <FileText className="mr-2" size={18} />
              Browse Files
            </Button>
          </div>
        </div>

        {/* Current File Info */}
        {fileName && (
          <div className="flex items-center justify-between text-sm bg-cornerstone-blue/5 rounded-lg p-3 border border-cornerstone-blue/20">
            <div>
              <span className="text-cornerstone-stone">Editing:</span>{' '}
              <span className="font-semibold text-cornerstone-charcoal">{fileName}</span>
            </div>
            {isDirty && (
              <span className="text-orange-600 font-semibold">● Unsaved changes</span>
            )}
          </div>
        )}

        {/* Code Editor */}
        <div className="space-y-2">
          <Label className="text-cornerstone-charcoal">Code Content</Label>
          <Textarea
            value={fileContent}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={hasDirectoryAccess ? "Select a file to edit..." : "Open project directory to begin..."}
            className="min-h-[500px] font-mono text-sm border-cornerstone-stone/20"
            style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleSaveFile}
            disabled={!hasDirectoryAccess || (!selectedFile && !fileName)}
            className="bg-cornerstone-blue hover:bg-cornerstone-blue-dark text-white disabled:opacity-50"
          >
            <Save className="mr-2" size={18} />
            Save to File System
          </Button>
          <Button 
            onClick={handleDownloadFile}
            disabled={!fileContent}
            variant="outline"
            className="border-cornerstone-stone/30"
          >
            <Download className="mr-2" size={18} />
            Download Copy
          </Button>
        </div>

        {/* Info Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>How This Works</AlertTitle>
          <AlertDescription className="text-sm space-y-2">
            <p>
              <strong>Local File System:</strong> You're editing files on your computer. Changes save directly to your local project.
            </p>
            <p>
              <strong>To Deploy Changes:</strong> After saving files, commit changes to Git and push to deploy (Netlify/Vercel auto-deploys from Git).
            </p>
            <p>
              <strong>Privacy:</strong> Files never leave your computer. All operations are local.
            </p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AdminCodeEditor;
