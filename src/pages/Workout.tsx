import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, CheckCircle2, ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateWorkout, markWorkoutComplete, getWorkoutDifficulty, setWorkoutDifficulty, getPreviewDay, isPreviewMode, getCurrentDayFromCalendar, getTodayCompletionStatus } from '@/data/journeyData';
import { useToast } from '@/hooks/use-toast';
import DayNavigator from '@/components/DayNavigator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Workout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(getWorkoutDifficulty());
  
  const previewDay = getPreviewDay();
  const inPreviewMode = isPreviewMode();
  const calendarDay = getCurrentDayFromCalendar();
  
  // Start with current calendar day or preview day
  const [viewingDay, setViewingDay] = useState(inPreviewMode ? previewDay! : calendarDay);
  const [completionStatus, setCompletionStatus] = useState(getTodayCompletionStatus(viewingDay));
  
  const workout = generateWorkout(viewingDay, difficulty);
  const isViewingToday = viewingDay === calendarDay && !inPreviewMode;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewingDay]);

  useEffect(() => {
    // Update completion status when day changes
    setCompletionStatus(getTodayCompletionStatus(viewingDay));
  }, [viewingDay]);

  const handleDayChange = (newDay: number) => {
    setViewingDay(newDay);
  };

  const handleDifficultyChange = (newDifficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setDifficulty(newDifficulty);
    if (!inPreviewMode) {
      setWorkoutDifficulty(newDifficulty);
      toast({
        title: "Difficulty Updated",
        description: `Workout difficulty set to ${newDifficulty}`,
      });
    }
  };

  const handleComplete = () => {
    if (!isViewingToday) {
      toast({
        title: "Cannot Complete Past Days",
        description: "You can only complete today's workout. Use the navigator to jump to today.",
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

    markWorkoutComplete(viewingDay);
    setCompletionStatus(getTodayCompletionStatus(viewingDay));
    toast({
      title: "Workout Complete! 💪",
      description: "You've completed today's workout. Building strength physically and spiritually.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Button>

        {!workout.isSabbath && (
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-cornerstone-stone" />
            <Select value={difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Day Navigator */}
      <DayNavigator
        currentDay={viewingDay}
        onDayChange={handleDayChange}
        maxDay={90}
      />

      {/* Header */}
      <Card className={`border-l-4 ${workout.isSabbath ? 'border-l-blue-600 bg-gradient-to-r from-blue-50/50 to-transparent' : 'border-l-cornerstone-gold bg-gradient-to-r from-cornerstone-gold/5 to-transparent'}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Dumbbell className={workout.isSabbath ? 'text-blue-600' : 'text-cornerstone-gold'} size={32} />
                <div>
                  <CardTitle className="text-3xl text-cornerstone-charcoal">Day {viewingDay}</CardTitle>
                  <p className="text-sm text-cornerstone-stone mt-1">
                    {workout.isSabbath ? 'Sabbath Rest' : `${workout.duration} • ${workout.difficulty}`}
                  </p>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-cornerstone-charcoal mt-4">{workout.title}</h2>
            </div>
            {completionStatus.workoutComplete && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
                <CheckCircle2 size={20} />
                <span className="text-sm font-semibold">Completed</span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Spiritual Connection */}
      <Card className="border-l-4 border-l-cornerstone-blue">
        <CardHeader>
          <CardTitle className="text-cornerstone-charcoal">Spiritual Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-cornerstone-charcoal">
            {workout.spiritualConnection}
          </p>
        </CardContent>
      </Card>

      {/* Sabbath Rest - No Workout */}
      {workout.isSabbath && (
        <Card className="bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-cornerstone-charcoal">Rest & Reflection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-cornerstone-charcoal">
              Today is a Sabbath rest day. Your body needs recovery as much as it needs training. Use today for:
            </p>
            <ul className="space-y-2 text-cornerstone-charcoal">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Gentle stretching or yoga</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Light walking or hiking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Prayer and meditation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Spending time with family</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Reflecting on the week's progress</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Regular Workout - Warmup, Main, Cooldown */}
      {!workout.isSabbath && (
        <>
          {/* Warmup */}
          {workout.warmup.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-cornerstone-charcoal">Warmup</CardTitle>
                <CardDescription>Prepare your body for the work ahead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workout.warmup.map((exercise, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-cornerstone-stone/5 rounded-lg">
                      <div className="bg-cornerstone-gold/20 text-cornerstone-gold font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-cornerstone-charcoal">{exercise.name}</h4>
                        <p className="text-sm text-cornerstone-stone">
                          {exercise.reps && `${exercise.reps} reps`}
                          {exercise.duration && exercise.duration}
                          {exercise.description && ` • ${exercise.description}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Workout */}
          <Card className="border-2 border-cornerstone-gold/30">
            <CardHeader>
              <CardTitle className="text-cornerstone-charcoal">Main Workout</CardTitle>
              <CardDescription>Push your limits. Build your strength.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workout.main.map((exercise, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white border border-cornerstone-stone/10 rounded-lg shadow-sm">
                    <div className="bg-cornerstone-gold text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-cornerstone-charcoal">{exercise.name}</h4>
                      <p className="text-sm text-cornerstone-stone mt-1">
                        {exercise.sets && `${exercise.sets} sets`}
                        {exercise.reps && ` × ${exercise.reps} reps`}
                        {exercise.duration && exercise.duration}
                      </p>
                      {exercise.description && (
                        <p className="text-sm text-cornerstone-stone mt-2 italic">{exercise.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cooldown */}
          {workout.cooldown.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-cornerstone-charcoal">Cooldown</CardTitle>
                <CardDescription>Recovery is part of growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workout.cooldown.map((exercise, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50/30 rounded-lg">
                      <div className="bg-blue-500/20 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-cornerstone-charcoal">{exercise.name}</h4>
                        <p className="text-sm text-cornerstone-stone">
                          {exercise.duration && exercise.duration}
                          {exercise.description && ` • ${exercise.description}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Complete Button - Only show if viewing today */}
      {isViewingToday && (
        <div className="flex justify-center pb-8">
          <Button
            size="lg"
            onClick={handleComplete}
            disabled={completionStatus.workoutComplete}
            className={`${
              completionStatus.workoutComplete
                ? 'bg-green-600 hover:bg-green-700'
                : workout.isSabbath
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-cornerstone-gold hover:bg-cornerstone-gold-dark'
            } text-white px-8`}
          >
            {completionStatus.workoutComplete ? (
              <>
                <CheckCircle2 className="mr-2" size={20} />
                Workout Complete
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

export default Workout;
