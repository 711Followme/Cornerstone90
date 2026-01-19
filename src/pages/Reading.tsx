import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dailyReadings, markReadingComplete, getPreviewDay, isPreviewMode, getCurrentDayFromCalendar, getTodayCompletionStatus } from '@/data/journeyData';
import { useToast } from '@/hooks/use-toast';
import DayNavigator from '@/components/DayNavigator';

const Reading = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const previewDay = getPreviewDay();
  const inPreviewMode = isPreviewMode();
  const calendarDay = getCurrentDayFromCalendar();
  
  // Start with current calendar day or preview day
  const [viewingDay, setViewingDay] = useState(() => {
    const day = inPreviewMode ? previewDay! : calendarDay;
    // Ensure day is valid (1-90)
    return Math.max(1, Math.min(day, 90));
  });
  
  const [completionStatus, setCompletionStatus] = useState(getTodayCompletionStatus(viewingDay));
  
  // Get reading with fallback
  const getReadingForDay = (day: number) => {
    try {
      const index = Math.max(0, Math.min(day - 1, dailyReadings.length - 1));
      const reading = dailyReadings[index];
      
      if (!reading) {
        console.warn('[Reading] No reading found for day', day, '- using first reading');
        return dailyReadings[0];
      }
      
      return reading;
    } catch (error) {
      console.error('[Reading] Error getting reading for day', day, ':', error);
      // Return first reading as fallback
      return dailyReadings[0] || {
        day: 1,
        title: 'Error Loading Reading',
        book: 'Nehemiah',
        chapter: 1,
        verses: '1-11',
        passage: 'Unable to load reading content. Please refresh the page.',
        reflection: '',
        application: '',
        prayer: '',
        mensAllianceValue: ''
      };
    }
  };
  
  const reading = getReadingForDay(viewingDay);
  const isViewingToday = viewingDay === calendarDay && !inPreviewMode;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewingDay]);

  useEffect(() => {
    // Update completion status when day changes
    try {
      setCompletionStatus(getTodayCompletionStatus(viewingDay));
    } catch (error) {
      console.error('[Reading] Error getting completion status:', error);
      setCompletionStatus({ readingComplete: false, workoutComplete: false, bothComplete: false });
    }
  }, [viewingDay]);

  const handleDayChange = (newDay: number) => {
    console.log('[Reading] Changing to day:', newDay);
    setViewingDay(newDay);
  };

  const handleComplete = () => {
    if (!isViewingToday) {
      toast({
        title: "Cannot Complete Past Days",
        description: "You can only complete today's reading. Use the navigator to jump to today.",
        variant: "destructive"
      });
      return;
    }

    if (inPreviewMode) {
      toast({
        title: "Preview Mode",
        description: "Cannot mark complete in preview mode.",
        variant: "destructive"
      });
      return;
    }

    try {
      markReadingComplete(viewingDay);
      setCompletionStatus(getTodayCompletionStatus(viewingDay));
      toast({
        title: "Reading Complete! 🙏",
        description: "You've completed today's reading. Keep building on the Rock.",
      });
    } catch (error) {
      console.error('[Reading] Error marking complete:', error);
      toast({
        title: "Error",
        description: "Failed to mark reading as complete. Please try again.",
        variant: "destructive"
      });
    }
  };

  console.log('[Reading] Current state:', {
    viewingDay,
    calendarDay,
    reading: reading?.title,
    isViewingToday,
    completionStatus
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Button>
      </div>

      {/* Day Navigator */}
      <DayNavigator
        currentDay={viewingDay}
        onDayChange={handleDayChange}
        maxDay={90}
      />

      {/* Header */}
      <Card className="border-l-4 border-l-cornerstone-blue bg-gradient-to-r from-cornerstone-blue/5 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <BookOpen className="text-cornerstone-blue" size={32} />
                <div>
                  <CardTitle className="text-3xl text-cornerstone-charcoal">Day {viewingDay}</CardTitle>
                  <p className="text-sm text-cornerstone-stone mt-1">
                    {reading.book} {reading.chapter}:{reading.verses}
                  </p>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-cornerstone-charcoal mt-4">{reading.title}</h2>
            </div>
            {completionStatus.readingComplete && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
                <CheckCircle2 size={20} />
                <span className="text-sm font-semibold">Completed</span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Scripture Passage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Scripture Passage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-cornerstone-stone/5 p-6 rounded-lg border-l-4 border-cornerstone-gold">
            <p className="text-base leading-relaxed text-cornerstone-charcoal whitespace-pre-line">
              {reading.passage}
            </p>
            <p className="text-sm text-cornerstone-stone mt-4 italic">
              — {reading.book} {reading.chapter}:{reading.verses} (HCSB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reflection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none">
            <p className="text-base leading-relaxed text-cornerstone-charcoal whitespace-pre-line">
              {reading.reflection}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Application */}
      <Card className="border-l-4 border-l-cornerstone-gold">
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Application</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-cornerstone-charcoal whitespace-pre-line">
            {reading.application}
          </p>
        </CardContent>
      </Card>

      {/* Prayer */}
      <Card className="bg-gradient-to-br from-cornerstone-blue/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Prayer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-cornerstone-charcoal italic whitespace-pre-line">
            {reading.prayer}
          </p>
        </CardContent>
      </Card>

      {/* Men's Alliance Value */}
      <Card className="border-2 border-cornerstone-blue/20">
        <CardHeader>
          <CardTitle className="text-sm text-cornerstone-stone">Men's Alliance Value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base text-cornerstone-charcoal font-medium">
            {reading.mensAllianceValue}
          </p>
        </CardContent>
      </Card>

      {/* Complete Button - Only show if viewing today */}
      {isViewingToday && (
        <div className="flex justify-center pb-8">
          <Button
            size="lg"
            onClick={handleComplete}
            disabled={completionStatus.readingComplete}
            className={`${
              completionStatus.readingComplete
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-cornerstone-blue hover:bg-cornerstone-blue-dark'
            } text-white px-8`}
          >
            {completionStatus.readingComplete ? (
              <>
                <CheckCircle2 className="mr-2" size={20} />
                Reading Complete
              </>
            ) : (
              'Mark as Complete'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reading;
