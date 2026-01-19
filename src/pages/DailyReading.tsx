import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, CheckCircle2, Eye, Square } from 'lucide-react';
import { dailyReadings, getUserProgress, markReadingComplete, getTodayCompletionStatus, getPreviewDay, isPreviewMode, getCurrentDayFromCalendar } from '@/data/journeyData';
import { useToast } from '@/hooks/use-toast';
import DayNavigator from '@/components/DayNavigator';

const DailyReading = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(getUserProgress());
  const [viewingDay, setViewingDay] = useState(getCurrentDayFromCalendar());
  const [reflection, setReflection] = useState('');
  const [completed, setCompleted] = useState(false);
  
  // Check for preview mode
  const previewDay = getPreviewDay();
  const inPreviewMode = isPreviewMode();
  const currentDay = inPreviewMode ? previewDay! : viewingDay;
  
  const currentReading = dailyReadings[Math.min(currentDay - 1, dailyReadings.length - 1)] || dailyReadings[0];
  const calendarDay = getCurrentDayFromCalendar();
  const isViewingToday = currentDay === calendarDay;

  useEffect(() => {
    setCompleted(getTodayCompletionStatus(currentDay).readingComplete);
  }, [currentDay]);

  const handleDayChange = (newDay: number) => {
    setViewingDay(newDay);
    setReflection(''); // Clear reflection when switching days
  };

  const handleComplete = () => {
    if (inPreviewMode) {
      toast({
        title: "Preview mode active",
        description: "Exit preview mode to mark readings complete.",
        variant: "destructive"
      });
      return;
    }

    if (!isViewingToday) {
      toast({
        title: "Can't complete past days",
        description: "Return to today to mark reading complete.",
        variant: "destructive"
      });
      return;
    }

    if (reflection.trim().length < 20) {
      toast({
        title: "Reflection too short",
        description: "Take time to reflect deeply. Write at least a few sentences.",
        variant: "destructive"
      });
      return;
    }

    setCompleted(true);
    markReadingComplete(currentDay);
    
    toast({
      title: "Reading completed! 🏛️",
      description: "Your reflection has been saved. Keep building on the Rock.",
    });

    console.log('Reflection saved:', { day: currentDay, reflection });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center sticky top-0 z-10 gap-4 border-b border-cornerstone-stone/20 bg-white/95 backdrop-blur px-6 py-4 shadow-sm">
        <SidebarTrigger />
        <Square className="text-cornerstone-blue" size={24} strokeWidth={2.5} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-cornerstone-charcoal">Daily Reading</h1>
          <p className="text-sm text-cornerstone-stone">Day {currentDay} - {currentReading.book} {currentReading.chapter}:{currentReading.verses}</p>
        </div>
        {inPreviewMode && (
          <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-2 rounded-lg border border-yellow-400/30">
            <Eye className="text-yellow-600" size={18} />
            <div>
              <p className="text-xs text-cornerstone-stone">Preview</p>
              <p className="text-sm font-bold text-cornerstone-charcoal">Day {currentDay}</p>
            </div>
          </div>
        )}
        {completed && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-auto p-6 bg-cornerstone-warm-white">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Day Navigator */}
          {!inPreviewMode && (
            <DayNavigator 
              currentDay={viewingDay}
              onDayChange={handleDayChange}
              maxDay={progress.duration}
            />
          )}

          {/* Preview Mode Banner */}
          {inPreviewMode && (
            <Card className="border-l-4 border-l-yellow-600 bg-yellow-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="text-yellow-600" size={22} />
                  <div>
                    <p className="font-semibold text-cornerstone-charcoal">Preview Mode Active</p>
                    <p className="text-sm text-cornerstone-stone">
                      Viewing Day {currentDay}. Completion tracking is disabled in preview mode.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Viewing Past Day Banner */}
          {!isViewingToday && !inPreviewMode && (
            <Card className="border-l-4 border-l-orange-600 bg-orange-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="text-orange-600" size={22} />
                  <div>
                    <p className="font-semibold text-cornerstone-charcoal">Viewing Past Day</p>
                    <p className="text-sm text-cornerstone-stone">
                      You're viewing Day {currentDay}. Use the navigator to return to Day {calendarDay} (today).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reading Header */}
          <Card className="border-l-4 border-l-cornerstone-blue bg-white shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-cornerstone-blue/10 rounded-lg">
                  <BookOpen className="text-cornerstone-blue" size={28} />
                </div>
                <div>
                  <CardTitle className="text-2xl text-cornerstone-charcoal">{currentReading.title}</CardTitle>
                  <CardDescription className="text-base text-cornerstone-stone">{currentReading.book} {currentReading.chapter}:{currentReading.verses}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Scripture Passage */}
          <Card className="bg-white border border-cornerstone-stone/20">
            <CardHeader className="bg-cornerstone-blue/5 border-b border-cornerstone-stone/10">
              <CardTitle className="text-lg text-cornerstone-charcoal">Scripture</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-base leading-relaxed italic text-cornerstone-charcoal">
                {currentReading.passage}
              </p>
            </CardContent>
          </Card>

          {/* Reflection */}
          <Card className="bg-gradient-to-br from-cornerstone-blue/5 to-white border border-cornerstone-blue/20">
            <CardHeader>
              <CardTitle className="text-lg text-cornerstone-charcoal">Reflection</CardTitle>
              <CardDescription className="text-cornerstone-stone">How does this passage speak to your journey?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-cornerstone-charcoal">
                {currentReading.reflection}
              </p>
            </CardContent>
          </Card>

          {/* Application */}
          <Card className="bg-gradient-to-br from-cornerstone-gold/5 to-white border border-cornerstone-gold/20">
            <CardHeader>
              <CardTitle className="text-lg text-cornerstone-charcoal">Real-Life Application</CardTitle>
              <CardDescription className="text-cornerstone-stone">Building character today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed font-medium text-cornerstone-charcoal">
                {currentReading.application}
              </p>
            </CardContent>
          </Card>

          {/* Men's Alliance Value */}
          {currentReading.mensAllianceValue && (
            <Card className="bg-gradient-to-br from-cornerstone-stone/5 to-white border-l-4 border-l-cornerstone-stone">
              <CardHeader>
                <CardTitle className="text-lg text-cornerstone-charcoal">Men's Alliance Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-cornerstone-stone">
                  {currentReading.mensAllianceValue}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Personal Reflection */}
          {!inPreviewMode && isViewingToday && (
            <Card className="bg-white border-2 border-cornerstone-blue/20 shadow-md">
              <CardHeader className="bg-cornerstone-blue/5">
                <CardTitle className="text-lg text-cornerstone-charcoal">Your Reflection</CardTitle>
                <CardDescription className="text-cornerstone-stone">Write your thoughts, struggles, and commitments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <Textarea
                  placeholder="What is God speaking to you today? What needs to be built on the Cornerstone? What step of obedience will you take?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[200px] text-base border-cornerstone-stone/20 focus:border-cornerstone-blue"
                  disabled={completed}
                />
                {!completed && (
                  <Button 
                    onClick={handleComplete}
                    className="w-full bg-cornerstone-blue hover:bg-cornerstone-blue-dark text-white"
                    size="lg"
                  >
                    <CheckCircle2 className="mr-2" size={20} />
                    Complete Today's Reading
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Prayer */}
          <Card className="border-2 border-cornerstone-gold/20 bg-gradient-to-br from-cornerstone-gold/5 to-white">
            <CardHeader>
              <CardTitle className="text-lg text-cornerstone-charcoal">Prayer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed italic text-cornerstone-charcoal">
                {currentReading.prayer}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DailyReading;
