import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Dumbbell, Target, TrendingUp, Users, User, CheckCircle2, Calendar } from 'lucide-react';
import { dailyReadings, getCurrentDayFromCalendar, getUserProgress, initializeJourney, getTodayCompletionStatus, generateWorkout, getWorkoutDifficulty, getCalendarDateForDay } from '@/data/journeyData';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);
  const [completionStatus, setCompletionStatus] = useState({ readingComplete: false, workoutComplete: false, bothComplete: false });

  useEffect(() => {
    try {
      console.log('[Dashboard] Initializing...');
      initializeJourney();
      const day = getCurrentDayFromCalendar();
      console.log('[Dashboard] Current day from calendar:', day);
      
      // Ensure day is valid
      const validDay = Math.max(1, Math.min(day, 90));
      console.log('[Dashboard] Valid day (clamped):', validDay);
      
      setCurrentDay(validDay);
      
      const status = getTodayCompletionStatus(validDay);
      console.log('[Dashboard] Completion status:', status);
      setCompletionStatus(status);
    } catch (error) {
      console.error('[Dashboard] Error during initialization:', error);
      // Fallback to day 1 if error
      setCurrentDay(1);
      setCompletionStatus({ readingComplete: false, workoutComplete: false, bothComplete: false });
    }
  }, []);

  // Get today's reading with fallback
  const getTodaysReading = () => {
    try {
      const index = Math.max(0, Math.min(currentDay - 1, dailyReadings.length - 1));
      const reading = dailyReadings[index];
      
      if (!reading) {
        console.warn('[Dashboard] No reading found for day', currentDay, '- using first reading');
        return dailyReadings[0] || {
          title: 'Loading...',
          book: 'Nehemiah',
          chapter: 1,
          verses: '1-11',
          passage: 'Content loading...',
          reflection: '',
          application: '',
          prayer: '',
          mensAllianceValue: ''
        };
      }
      
      return reading;
    } catch (error) {
      console.error('[Dashboard] Error getting reading:', error);
      return {
        title: 'Error Loading Reading',
        book: 'Nehemiah',
        chapter: 1,
        verses: '1-11',
        passage: 'Error loading content',
        reflection: '',
        application: '',
        prayer: '',
        mensAllianceValue: ''
      };
    }
  };

  // Get today's workout with fallback
  const getTodaysWorkout = () => {
    try {
      const difficulty = getWorkoutDifficulty();
      const workout = generateWorkout(currentDay, difficulty);
      
      if (!workout || !workout.title) {
        console.warn('[Dashboard] No workout found for day', currentDay);
        return {
          title: 'Rest Day',
          duration: '0 min',
          difficulty: 'Beginner',
          isSabbath: true,
          warmup: [],
          main: [],
          cooldown: [],
          spiritualConnection: 'Take time to rest and recover.'
        };
      }
      
      return workout;
    } catch (error) {
      console.error('[Dashboard] Error getting workout:', error);
      return {
        title: 'Error Loading Workout',
        duration: '0 min',
        difficulty: 'Beginner',
        isSabbath: true,
        warmup: [],
        main: [],
        cooldown: [],
        spiritualConnection: 'Error loading workout content'
      };
    }
  };

  const todaysReading = getTodaysReading();
  const todaysWorkout = getTodaysWorkout();
  const progress = getUserProgress();
  const calendarDate = getCalendarDateForDay(currentDay);

  console.log('[Dashboard] Today\'s reading:', todaysReading);
  console.log('[Dashboard] Today\'s workout:', todaysWorkout);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cornerstone-stone/10 via-white to-cornerstone-blue/5">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-5xl font-bold text-cornerstone-charcoal">
            CORNERSTONE: 90
          </h1>
          <p className="text-xl text-cornerstone-stone">
            Building Your Life on the Rock
          </p>
          <div className="flex items-center justify-center gap-2 text-cornerstone-blue">
            <Calendar size={20} />
            <p className="text-lg font-semibold">
              Day {currentDay} of 90 • {calendarDate}
            </p>
          </div>
        </div>

        {/* Welcome Message for Profile */}
        {!profile && (
          <Card className="border-l-4 border-l-cornerstone-blue bg-blue-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <User className="text-cornerstone-blue flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h3 className="font-semibold text-cornerstone-charcoal mb-2">
                    Welcome! Complete Your Profile
                  </h3>
                  <p className="text-sm text-cornerstone-stone mb-4">
                    Set up your profile to participate in Brotherhood chat and connect with others on this journey.
                  </p>
                  <Button
                    onClick={() => navigate('/profile')}
                    className="bg-cornerstone-blue hover:bg-cornerstone-blue-dark"
                  >
                    Complete Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cornerstone-stone">Current Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cornerstone-blue">{currentDay}</div>
              <p className="text-xs text-cornerstone-stone mt-1">of 90 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cornerstone-stone">Days Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{progress.daysCompleted}</div>
              <p className="text-xs text-cornerstone-stone mt-1">{Math.round((progress.daysCompleted / 90) * 100)}% complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cornerstone-stone">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{progress.streak}</div>
              <p className="text-xs text-cornerstone-stone mt-1">consecutive days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cornerstone-stone">Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cornerstone-gold">
                {completionStatus.bothComplete ? '2/2' : completionStatus.readingComplete || completionStatus.workoutComplete ? '1/2' : '0/2'}
              </div>
              <p className="text-xs text-cornerstone-stone mt-1">
                {completionStatus.bothComplete ? 'All complete!' : 'Keep going!'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Reading */}
          <Card className="border-l-4 border-l-cornerstone-blue hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/reading')}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-cornerstone-blue" size={28} />
                  <div>
                    <CardTitle className="text-xl">Daily Reading</CardTitle>
                    <CardDescription>
                      {todaysReading.book} {todaysReading.chapter}:{todaysReading.verses}
                    </CardDescription>
                  </div>
                </div>
                {completionStatus.readingComplete && (
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold text-lg text-cornerstone-charcoal mb-3">
                {todaysReading.title}
              </h3>
              <p className="text-sm text-cornerstone-stone line-clamp-3 mb-4">
                {todaysReading.passage?.substring(0, 200)}...
              </p>
              <Button className="w-full bg-cornerstone-blue hover:bg-cornerstone-blue-dark">
                Read Today's Devotional
              </Button>
            </CardContent>
          </Card>

          {/* Daily Workout */}
          <Card className="border-l-4 border-l-cornerstone-gold hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/workout')}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Dumbbell className="text-cornerstone-gold" size={28} />
                  <div>
                    <CardTitle className="text-xl">Daily Workout</CardTitle>
                    <CardDescription>{todaysWorkout.duration}</CardDescription>
                  </div>
                </div>
                {completionStatus.workoutComplete && (
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold text-lg text-cornerstone-charcoal mb-3">
                {todaysWorkout.title}
              </h3>
              <p className="text-sm text-cornerstone-stone line-clamp-3 mb-4">
                {todaysWorkout.spiritualConnection?.substring(0, 200)}...
              </p>
              <Button className="w-full bg-cornerstone-gold hover:bg-cornerstone-gold-dark">
                {todaysWorkout.isSabbath ? 'View Rest Day' : 'Start Workout'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/disciplines')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="text-cornerstone-blue" size={24} />
                <CardTitle className="text-lg">Daily Disciplines</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cornerstone-stone">
                Track your spiritual, physical, mental, and relational habits
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/progress')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-600" size={24} />
                <CardTitle className="text-lg">View Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cornerstone-stone">
                See your journey analytics and growth over time
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/brotherhood')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="text-cornerstone-gold" size={24} />
                <CardTitle className="text-lg">Brotherhood</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cornerstone-stone">
                Connect with others and share your journey
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quote */}
        <Card className="bg-gradient-to-r from-cornerstone-blue/10 to-cornerstone-gold/10 border-none">
          <CardContent className="p-8 text-center">
            <p className="text-lg italic text-cornerstone-charcoal mb-2">
              "Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock."
            </p>
            <p className="text-sm text-cornerstone-stone font-semibold">
              — Matthew 7:24
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
