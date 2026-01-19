import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileCode, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminUpload = () => {
  const { toast } = useToast();

  const handleUploadCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      toast({
        title: "File uploaded ✅",
        description: `${file.name} loaded successfully`,
      });
      console.log('[Admin] Code file uploaded:', file.name, content.length);
    };
    reader.readAsText(file);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast({
      title: "Image uploaded ✅",
      description: `${file.name} ready to use`,
    });

    console.log('[Admin] Image uploaded:', file.name, file.size);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Upload Code Files */}
      <Card className="bg-white border border-cornerstone-stone/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
            <FileCode className="text-cornerstone-blue" size={24} />
            Upload Code Files
          </CardTitle>
          <CardDescription className="text-cornerstone-stone">
            Upload .tsx, .ts, .js, .css files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-cornerstone-stone/30 rounded-lg p-8 text-center hover:border-cornerstone-blue/50 transition-colors">
            <FileCode className="mx-auto text-cornerstone-stone mb-4" size={48} />
            <Label 
              htmlFor="code-upload" 
              className="cursor-pointer text-cornerstone-blue hover:text-cornerstone-blue-dark font-semibold"
            >
              Click to upload code files
            </Label>
            <Input
              id="code-upload"
              type="file"
              accept=".tsx,.ts,.js,.jsx,.css,.json"
              onChange={handleUploadCode}
              className="hidden"
            />
            <p className="text-xs text-cornerstone-stone mt-2">
              Supported: TSX, TS, JS, JSX, CSS, JSON
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Images */}
      <Card className="bg-white border border-cornerstone-stone/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
            <Image className="text-cornerstone-gold" size={24} />
            Upload Images
          </CardTitle>
          <CardDescription className="text-cornerstone-stone">
            Upload PNG, JPG, SVG files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-cornerstone-stone/30 rounded-lg p-8 text-center hover:border-cornerstone-gold/50 transition-colors">
            <Image className="mx-auto text-cornerstone-stone mb-4" size={48} />
            <Label 
              htmlFor="image-upload" 
              className="cursor-pointer text-cornerstone-gold hover:text-cornerstone-gold/80 font-semibold"
            >
              Click to upload images
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="hidden"
            />
            <p className="text-xs text-cornerstone-stone mt-2">
              Supported: PNG, JPG, SVG, WEBP
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUpload;
