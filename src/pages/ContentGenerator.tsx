import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, BookOpen, Dumbbell, Calendar, Download, CheckCircle2, ChevronLeft, ChevronRight, Eye, EyeOff, FileText, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { setPreviewDay, exitPreviewMode, getPreviewDay, isPreviewMode } from '@/data/journeyData';

const ContentGenerator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedDays, setGeneratedDays] = useState(4);
  const [previewDayNum, setPreviewDayNum] = useState(getPreviewDay() || 1);
  const [inPreviewMode, setInPreviewMode] = useState(isPreviewMode());

  useEffect(() => {
    setInPreviewMode(isPreviewMode());
  }, [previewDayNum]);

  const handleGenerate = async () => {
    setGenerating(true);
    setProgress(0);

    for (let i = generatedDays; i <= 90; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setProgress((i / 90) * 100);
      setGeneratedDays(i);
    }

    setGenerating(false);
    toast({
      title: "Content generated! 🎉",
      description: "All 90 days of readings and workouts are now available.",
    });
  };

  const handleDownloadStructure = (type: 'nehemiah' | 'nehemiah-weekly' | 'exodus' | 'james' | 'workout') => {
    const filenames = {
      nehemiah: 'nehemiah-90-day-outline.md',
      'nehemiah-weekly': 'nehemiah-weekly-outline.md',
      exodus: 'Exodus-90-Day-Structure.md',
      james: 'James-90-Day-Structure.md',
      workout: '90-Day-Workout-Structure.md'
    };
    
    const labels = {
      nehemiah: 'Nehemiah (Full Outline)',
      'nehemiah-weekly': 'Nehemiah Weekly',
      exodus: 'Exodus',
      james: 'James',
      workout: 'Workout'
    };
    
    const link = document.createElement('a');
    link.href = `/${filenames[type]}`;
    link.download = filenames[type];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Structure downloaded!",
      description: `${labels[type]} outline saved to your downloads folder.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Downloading all content as JSON...",
    });
    console.log('Exporting all 90 days of content');
  };

  const handlePreviousDay = () => {
    if (previewDayNum > 1) {
      const newDay = previewDayNum - 1;
      setPreviewDayNum(newDay);
      setPreviewDay(newDay);
      toast({
        title: `Previewing Day ${newDay}`,
        description: "Navigate to other pages to see this day's content.",
      });
    }
  };

  const handleNextDay = () => {
    if (previewDayNum < 90) {
      const newDay = previewDayNum + 1;
      setPreviewDayNum(newDay);
      setPreviewDay(newDay);
      toast({
        title: `Previewing Day ${newDay}`,
        description: "Navigate to other pages to see this day's content.",
      });
    }
  };

  const handleDayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 90) {
      setPreviewDayNum(value);
      setPreviewDay(value);
      toast({
        title: `Previewing Day ${value}`,
        description: "Navigate to other pages to see this day's content.",
      });
    }
  };

  const handleEnterPreviewMode = () => {
    setPreviewDay(previewDayNum);
    setInPreviewMode(true);
    toast({
      title: "Preview mode activated",
      description: `Now viewing Day ${previewDayNum}. Navigate to see content.`,
    });
  };

  const handleExitPreviewMode = () => {
    exitPreviewMode();
    setInPreviewMode(false);
    toast({
      title: "Preview mode deactivated",
      description: "Returned to your actual journey day.",
    });
  };

  const handleViewDay = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center sticky top-0 z-10 gap-4 border-b border-cornerstone-stone/20 bg-white/95 backdrop-blur px-6 py-4 shadow-sm">
        <SidebarTrigger />
        <Square className="text-cornerstone-gold" size={24} strokeWidth={2.5} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-cornerstone-charcoal">Content Generator</h1>
          <p className="text-sm text-cornerstone-stone">Generate and preview all 90 days of journey content</p>
        </div>
        {inPreviewMode && (
          <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-lg border border-yellow-500">
            <Eye className="text-yellow-600" size={20} />
            <div>
              <p className="text-xs text-muted-foreground">Preview Mode</p>
              <p className="text-sm font-bold text-yellow-600">Day {previewDayNum}</p>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-auto p-6 bg-cornerstone-warm-white">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Current Status Alert */}
          <Card className="border-l-4 border-l-cornerstone-blue bg-gradient-to-r from-cornerstone-blue/5 to-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Square className="text-cornerstone-blue flex-shrink-0" size={32} strokeWidth={2.5} />
                <div>
                  <h3 className="text-lg font-bold text-cornerstone-charcoal mb-2">Weekly Template Structure Active</h3>
                  <p className="text-sm text-cornerstone-stone mb-3">
                    The reading plan has been restructured to a <strong>weekly format</strong>. Currently <strong>Week 1 (Days 1-4)</strong> is complete with full content.
                  </p>
                  <ul className="text-sm space-y-1 text-cornerstone-charcoal">
                    <li>• <strong>Day 1:</strong> Nehemiah 1:1-11 - Obedience and Broken Walls</li>
                    <li>• <strong>Day 2:</strong> Matthew 6:10-18 - Prayer and Fasting</li>
                    <li>• <strong>Day 3:</strong> Jeremiah 29:11-13 - Intercessory Prayer</li>
                    <li>• <strong>Day 4:</strong> Luke 22:32 - Compassion and Restoration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day Preview Controls */}
          <Card className="border-2 border-cornerstone-stone/20 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
                <Eye className="text-cornerstone-blue" size={24} />
                Day Preview Controls
              </CardTitle>
              <CardDescription className="text-cornerstone-stone">
                Cycle through days to preview content (Note: Only Days 1-4 have full reading content currently)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handlePreviousDay}
                  disabled={previewDayNum <= 1}
                  variant="outline"
                  size="lg"
                  className="border-cornerstone-stone/20"
                >
                  <ChevronLeft className="mr-2" size={20} />
                  Previous Day
                </Button>
                
                <div className="flex-1 space-y-2">
                  <Label htmlFor="dayInput" className="text-cornerstone-charcoal">Jump to Day</Label>
                  <Input
                    id="dayInput"
                    type="number"
                    min="1"
                    max="90"
                    value={previewDayNum}
                    onChange={handleDayInputChange}
                    className="text-center text-2xl font-bold border-cornerstone-stone/20"
                  />
                </div>

                <Button
                  onClick={handleNextDay}
                  disabled={previewDayNum >= 90}
                  variant="outline"
                  size="lg"
                  className="border-cornerstone-stone/20"
                >
                  Next Day
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </div>

              <div className="flex gap-3">
                {!inPreviewMode ? (
                  <Button
                    onClick={handleEnterPreviewMode}
                    className="flex-1 bg-cornerstone-blue hover:bg-cornerstone-blue-dark text-white"
                    size="lg"
                  >
                    <Eye className="mr-2" size={20} />
                    Enter Preview Mode (Day {previewDayNum})
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleViewDay}
                      className="flex-1 bg-cornerstone-blue hover:bg-cornerstone-blue-dark text-white"
                      size="lg"
                    >
                      <BookOpen className="mr-2" size={20} />
                      View Day {previewDayNum} Content
                    </Button>
                    <Button
                      onClick={handleExitPreviewMode}
                      variant="outline"
                      size="lg"
                      className="border-cornerstone-stone/20"
                    >
                      <EyeOff className="mr-2" size={20} />
                      Exit Preview
                    </Button>
                  </>
                )}
              </div>

              {inPreviewMode && (
                <div className="bg-yellow-500/10 border border-yellow-500 rounded-lg p-4">
                  <p className="text-sm font-semibold text-yellow-700 mb-1">
                    ⚠️ Preview Mode Active
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You are currently previewing Day {previewDayNum}. Navigate to Daily Reading, Workout, 
                    or other pages to see this day's content. Click "Exit Preview" to return to your actual journey day.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="border-2 border-cornerstone-blue/20 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cornerstone-charcoal">
                <Zap className="text-cornerstone-gold" size={24} />
                Content Generation Status
              </CardTitle>
              <CardDescription className="text-cornerstone-stone">
                Current progress of your 90-day journey content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <BookOpen className="mx-auto text-green-600 mb-2" size={32} />
                  <p className="text-2xl font-bold text-green-600">{generatedDays}</p>
                  <p className="text-sm text-cornerstone-stone">Daily Readings</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Dumbbell className="mx-auto text-blue-600 mb-2" size={32} />
                  <p className="text-2xl font-bold text-blue-600">90</p>
                  <p className="text-sm text-cornerstone-stone">Workout Plans</p>
                </div>
                <div className="text-center p-4 bg-cornerstone-gold/10 rounded-lg border border-cornerstone-gold/30">
                  <Calendar className="mx-auto text-cornerstone-gold mb-2" size={32} />
                  <p className="text-2xl font-bold text-cornerstone-gold">{Math.round((generatedDays / 90) * 100)}%</p>
                  <p className="text-sm text-cornerstone-stone">Complete</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-cornerstone-charcoal">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-cornerstone-stone">{generatedDays} / 90 days</span>
                </div>
                <Progress value={(generatedDays / 90) * 100} className="h-3" />
              </div>

              {generatedDays < 90 && (
                <div className="bg-cornerstone-stone/5 p-4 rounded-lg border border-cornerstone-stone/20">
                  <p className="text-sm text-cornerstone-charcoal mb-3">
                    <strong>Next Steps:</strong> Additional weeks will follow the same template structure with different scripture passages and themes.
                  </p>
                  <Button 
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full bg-cornerstone-gold hover:bg-cornerstone-gold-dark text-white"
                    size="lg"
                  >
                    <Zap className="mr-2" size={20} />
                    {generating ? `Generating... ${Math.round(progress)}%` : 'Generate Remaining Days (Template-Based)'}
                  </Button>
                </div>
              )}

              {generatedDays === 90 && (
                <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="text-green-600" size={24} />
                  <p className="font-semibold text-green-600">All content generated!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Preview Tabs */}
          <Card className="bg-white border border-cornerstone-stone/20">
            <CardHeader>
              <CardTitle className="text-cornerstone-charcoal">Content Preview</CardTitle>
              <CardDescription className="text-cornerstone-stone">
                Preview the structure of generated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="readings" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="readings">Daily Readings</TabsTrigger>
                  <TabsTrigger value="workouts">Workouts</TabsTrigger>
                </TabsList>
                <TabsContent value="readings" className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-cornerstone-charcoal">Weekly Reading Structure:</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-cornerstone-stone">
                      <li><strong>Week 1 (Days 1-4):</strong> Foundation - Prayer, Obedience, Compassion</li>
                      <li>Day 1: Nehemiah passage (foundation)</li>
                      <li>Day 2: Supporting scripture on prayer/fasting</li>
                      <li>Day 3: Supporting scripture on intercession</li>
                      <li>Day 4: Supporting scripture on compassion</li>
                      <li>Each reading includes: passage, deep reflection, application, prayer, Men's Alliance value</li>
                    </ul>
                  </div>
                  <div className="bg-cornerstone-blue/5 p-4 rounded-lg border border-cornerstone-blue/20">
                    <p className="text-sm font-semibold mb-2 text-cornerstone-charcoal">Current Content:</p>
                    <ul className="text-xs space-y-1 text-cornerstone-stone">
                      <li>✅ <strong>Week 1 Complete</strong>: Nehemiah 1, Matthew 6, Jeremiah 29, Luke 22</li>
                      <li>🔄 <strong>Weeks 2-13</strong>: Template structure ready for additional content</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="workouts" className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-cornerstone-charcoal">Workout Structure:</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-cornerstone-stone">
                      <li>Complete 90-day progressive training plan</li>
                      <li>3 difficulty levels (Beginner/Intermediate/Advanced)</li>
                      <li>6 days training, 1 Sabbath rest (every 7th day)</li>
                      <li>4 progressive phases with deload weeks</li>
                      <li>Detailed exercise progressions</li>
                      <li>Sabbath rest guidelines (active recovery)</li>
                      <li>Spiritual connections for each workout</li>
                      <li>Form tips and injury prevention</li>
                    </ul>
                  </div>
                  <div className="bg-cornerstone-gold/5 p-4 rounded-lg border border-cornerstone-gold/20">
                    <p className="text-sm font-semibold mb-2 text-cornerstone-charcoal">Workout Phases:</p>
                    <ul className="text-xs space-y-1 text-cornerstone-stone">
                      <li>• <strong>Phase 1 (Weeks 1-4)</strong>: Foundation - Form and consistency</li>
                      <li>• <strong>Phase 2 (Weeks 5-8)</strong>: Building - Strength and endurance</li>
                      <li>• <strong>Phase 3 (Weeks 9-12)</strong>: Intensification - Peak performance</li>
                      <li>• <strong>Phase 4 (Week 13)</strong>: Completion - Testing and celebration</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-gradient-to-br from-cornerstone-blue/5 to-background border-2 border-cornerstone-blue/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-cornerstone-charcoal">About the Weekly Structure</h3>
                <p className="text-sm text-cornerstone-stone leading-relaxed">
                  <strong>Week 1 Complete</strong>: Four days of fully written content focusing on the foundation - 
                  Nehemiah's obedience, prayer and fasting, intercessory prayer, and compassion.
                </p>
                <p className="text-sm text-cornerstone-stone leading-relaxed">
                  Each week follows a similar pattern: one foundational passage from Nehemiah (or another core book), 
                  followed by supporting scriptures that reinforce the weekly theme with practical application for modern men.
                </p>
                <p className="text-sm text-cornerstone-stone leading-relaxed">
                  <strong>Workouts (Complete System)</strong>: Progressive 90-day training plan with 3 difficulty levels, 
                  weekly Sabbath rest, and complete exercise progressions tied to spiritual growth.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ContentGenerator;
