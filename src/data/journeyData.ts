import readings from './nehemiahReadings';

// FIXED PROGRAM START DATE: January 5, 2026 (Central Time)
const PROGRAM_START_DATE = '2026-01-05T00:00:00-06:00';

// Types
export interface DailyReading {
  day: number;
  book: string;
  chapter: number;
  verses: string;
  title: string;
  passage: string;
  reflection: string;
  application: string;
  prayer: string;
  mensAllianceValue: string;
}

export interface WorkoutExercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  description?: string;
  formTips?: string[];
  videoUrl?: string;
  videoPlaceholder?: string;
}

export interface DailyWorkout {
  day: number;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  warmup: WorkoutExercise[];
  main: WorkoutExercise[];
  cooldown: WorkoutExercise[];
  spiritualConnection: string;
  isSabbath: boolean;
}

export interface UserProgress {
  day: number;
  daysCompleted: number;
  streak: number;
  duration: number;
  selectedBook: string;
}

// Daily readings from Nehemiah
export const dailyReadings: DailyReading[] = readings;

// Men's Alliance Core Values
export const mensAllianceValues = [
  "Honor: Do not lie, cheat, steal, or laugh at sin.",
  "Humility: It's better to under sell and over deliver.",
  "Encouragement: No matter what happens you can always say, 'Good'",
  "Trust: Give others the benefit of the doubt.",
  "Perseverance: Whether in a workout, or in our lives, we strive to leave a legacy of never quitting.",
  "Feedback: Seek feedback from others, become comfortable receiving feedback from others."
];

// Calendar-based progression system (MOBILE COMPATIBLE WITH ERROR HANDLING)
export function getCurrentDayFromCalendar(): number {
  try {
    console.log('[Calendar] Starting day calculation...');
    
    // Get current UTC time
    const now = new Date();
    console.log('[Calendar] Current time (local):', now.toString());
    console.log('[Calendar] Current time (ISO):', now.toISOString());
    
    // Convert to Central Time manually (UTC-6 for CST, UTC-5 for CDT)
    // For simplicity, we'll use UTC-6 (adjust if needed for daylight saving)
    const centralOffset = -6 * 60; // -6 hours in minutes
    const centralTime = new Date(now.getTime() + (centralOffset + now.getTimezoneOffset()) * 60000);
    
    console.log('[Calendar] Central Time calculated:', centralTime.toISOString());
    
    // Program start: January 5, 2026 00:00:00 Central Time
    const startDate = new Date('2026-01-05T00:00:00');
    console.log('[Calendar] Program start date:', startDate.toISOString());
    
    // Calculate days elapsed
    const diffTime = centralTime.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    console.log('[Calendar] Time difference (ms):', diffTime);
    console.log('[Calendar] Days elapsed:', diffDays);
    
    // Current day = days elapsed + 1 (Day 1 starts on January 5)
    let currentDay = diffDays + 1;
    
    console.log('[Calendar] Calculated current day (before clamp):', currentDay);
    
    // Clamp between 1 and 90
    currentDay = Math.max(1, Math.min(currentDay, 90));
    
    console.log('[Calendar] Final current day (after clamp):', currentDay);
    
    // Validation check
    if (isNaN(currentDay) || currentDay < 1 || currentDay > 90) {
      console.error('[Calendar] Invalid day calculated:', currentDay, '- defaulting to 1');
      return 1;
    }
    
    return currentDay;
  } catch (error) {
    console.error('[Calendar] ❌ ERROR calculating current day:', error);
    console.error('[Calendar] Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('[Calendar] Error message:', error instanceof Error ? error.message : String(error));
    console.error('[Calendar] Defaulting to Day 1');
    return 1; // Fallback to day 1 if calculation fails
  }
}

export function isDayInFuture(day: number): boolean {
  try {
    return day > getCurrentDayFromCalendar();
  } catch (error) {
    console.error('[Calendar] Error in isDayInFuture:', error);
    return false;
  }
}

export function getProgramStartDate(): string {
  return '2026-01-05'; // Fixed start date
}

export function getCalendarDateForDay(day: number): string {
  try {
    console.log('[Calendar] Formatting date for day:', day);
    
    const startDate = new Date('2026-01-05T00:00:00');
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + (day - 1));
    
    // Format date manually for better mobile compatibility
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatted = `${months[targetDate.getMonth()]} ${targetDate.getDate()}, ${targetDate.getFullYear()}`;
    
    console.log('[Calendar] Formatted date:', formatted);
    return formatted;
  } catch (error) {
    console.error('[Calendar] Error formatting date for day', day, ':', error);
    return 'Jan 5, 2026'; // Fallback
  }
}

// Workout generation with error handling
export function generateWorkout(day: number, difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): DailyWorkout {
  try {
    console.log('[Workout] Generating workout for day', day, 'difficulty', difficulty);
    
    // Validate day
    if (isNaN(day) || day < 1 || day > 90) {
      console.error('[Workout] Invalid day:', day, '- using day 1');
      day = 1;
    }
    
    const isSabbath = day % 7 === 0;
    
    if (isSabbath) {
      return {
        day,
        title: "Sabbath Rest",
        duration: "Active Rest",
        difficulty,
        warmup: [],
        main: [],
        cooldown: [],
        spiritualConnection: "Remember the Sabbath day, to keep it holy. God rested on the seventh day - not because He was tired, but to set a pattern for us. Rest is not weakness; it's wisdom. Today, engage in gentle movement, spend time in prayer, and let your body recover as you reflect on the week.",
        isSabbath: true
      };
    }

    const workoutRotation = [
      { type: 'upper', focus: 'Push' },
      { type: 'lower', focus: 'Legs' },
      { type: 'upper', focus: 'Pull' },
      { type: 'conditioning', focus: 'Cardio' },
      { type: 'full', focus: 'Full Body' },
      { type: 'core', focus: 'Core & Stability' }
    ];
    
    const cycleDay = ((day - 1) % 6);
    const workout = workoutRotation[cycleDay];
    
    // ... (rest of workout generation code remains the same - continuing from your existing file)
    
    const workouts: Record<string, any> = {
      upper_Push: {
        title: "Upper Body - Push Day",
        duration: "45 minutes",
        spiritualConnection: "Push workouts represent pressing forward in faith.",
        warmup: [
          { name: "Arm Circles", duration: "1 min", description: "Forward and backward" },
          { name: "Band Pull-Aparts", reps: "15", description: "Light resistance band" }
        ],
        main: {
          Beginner: [
            { name: "Push-ups", sets: 3, reps: "8-12", description: "Knee push-ups if needed" }
          ],
          Intermediate: [
            { name: "Push-ups", sets: 4, reps: "12-15", description: "Standard form" }
          ],
          Advanced: [
            { name: "Weighted Push-ups", sets: 4, reps: "12-15", description: "Vest or plate on back" }
          ]
        },
        cooldown: [
          { name: "Chest Stretch", duration: "30 sec each side" }
        ]
      },
      lower_Legs: {
        title: "Lower Body - Legs Day",
        duration: "45 minutes",
        spiritualConnection: "Legs represent our foundation.",
        warmup: [
          { name: "Leg Swings", reps: "10 each direction" }
        ],
        main: {
          Beginner: [
            { name: "Goblet Squats", sets: 3, reps: "12-15" }
          ],
          Intermediate: [
            { name: "Back Squats", sets: 4, reps: "10-12" }
          ],
          Advanced: [
            { name: "Back Squats", sets: 5, reps: "8-10" }
          ]
        },
        cooldown: [
          { name: "Quad Stretch", duration: "30 sec each leg" }
        ]
      },
      upper_Pull: {
        title: "Upper Body - Pull Day",
        duration: "45 minutes",
        spiritualConnection: "Pull movements represent drawing near to God.",
        warmup: [
          { name: "Band Pull-Aparts", reps: "20" }
        ],
        main: {
          Beginner: [
            { name: "Assisted Pull-ups", sets: 3, reps: "6-10" }
          ],
          Intermediate: [
            { name: "Pull-ups", sets: 4, reps: "6-10" }
          ],
          Advanced: [
            { name: "Weighted Pull-ups", sets: 4, reps: "8-12" }
          ]
        },
        cooldown: [
          { name: "Lat Stretch", duration: "30 sec each side" }
        ]
      },
      conditioning_Cardio: {
        title: "Conditioning - Cardio Day",
        duration: "30-45 minutes",
        spiritualConnection: "Endurance training reflects spiritual endurance.",
        warmup: [
          { name: "Light Jog", duration: "5 min" }
        ],
        main: {
          Beginner: [
            { name: "Brisk Walk", duration: "20-30 min" }
          ],
          Intermediate: [
            { name: "Interval Running", duration: "25 min" }
          ],
          Advanced: [
            { name: "HIIT Sprints", duration: "20 min" }
          ]
        },
        cooldown: [
          { name: "Easy Walk", duration: "5 min" }
        ]
      },
      full_FullBody: {
        title: "Full Body Strength",
        duration: "50 minutes",
        spiritualConnection: "Full body workouts represent holistic transformation.",
        warmup: [
          { name: "Jumping Jacks", duration: "1 min" }
        ],
        main: {
          Beginner: [
            { name: "Goblet Squats", sets: 3, reps: "12" }
          ],
          Intermediate: [
            { name: "Front Squats", sets: 4, reps: "10" }
          ],
          Advanced: [
            { name: "Back Squats", sets: 4, reps: "8" }
          ]
        },
        cooldown: [
          { name: "Full Body Stretch", duration: "5 min" }
        ]
      },
      core_CoreStability: {
        title: "Core & Stability",
        duration: "35 minutes",
        spiritualConnection: "Your core is your center, your foundation.",
        warmup: [
          { name: "Cat-Cow Stretch", reps: "10" }
        ],
        main: {
          Beginner: [
            { name: "Plank", sets: 3, duration: "30-45 sec" }
          ],
          Intermediate: [
            { name: "Plank", sets: 4, duration: "45-60 sec" }
          ],
          Advanced: [
            { name: "Weighted Plank", sets: 4, duration: "60 sec" }
          ]
        },
        cooldown: [
          { name: "Child's Pose", duration: "1 min" }
        ]
      }
    };

    const workoutKey = `${workout.type}_${workout.focus.replace(/ /g, '')}`;
    const selectedWorkout = workouts[workoutKey];
    
    if (!selectedWorkout) {
      console.error('[Workout] Workout not found for key:', workoutKey);
      throw new Error(`Workout not found for day ${day}`);
    }
    
    const result = {
      day,
      title: selectedWorkout.title,
      duration: selectedWorkout.duration,
      difficulty,
      warmup: selectedWorkout.warmup,
      main: selectedWorkout.main[difficulty],
      cooldown: selectedWorkout.cooldown,
      spiritualConnection: selectedWorkout.spiritualConnection,
      isSabbath: false
    };
    
    console.log('[Workout] Generated workout:', result.title);
    return result;
    
  } catch (error) {
    console.error('[Workout] ❌ ERROR generating workout:', error);
    // Return a safe fallback workout
    return {
      day: day || 1,
      title: "Rest Day",
      duration: "Active Rest",
      difficulty,
      warmup: [],
      main: [],
      cooldown: [],
      spiritualConnection: "Take time to rest and recover.",
      isSabbath: true
    };
  }
}

export function getUserProgress(): UserProgress {
  try {
    const saved = localStorage.getItem('cornerstone_progress');
    if (saved) {
      return JSON.parse(saved);
    }
    const currentDay = getCurrentDayFromCalendar();
    return {
      day: currentDay,
      daysCompleted: 0,
      streak: 0,
      duration: 90,
      selectedBook: 'nehemiah'
    };
  } catch (error) {
    console.error('[Progress] Error getting user progress:', error);
    return {
      day: 1,
      daysCompleted: 0,
      streak: 0,
      duration: 90,
      selectedBook: 'nehemiah'
    };
  }
}

export function saveUserProgress(progress: UserProgress) {
  try {
    localStorage.setItem('cornerstone_progress', JSON.stringify(progress));
  } catch (error) {
    console.error('[Progress] Error saving user progress:', error);
  }
}

export function initializeJourney() {
  try {
    const existing = localStorage.getItem('cornerstone_progress');
    if (!existing) {
      const currentDay = getCurrentDayFromCalendar();
      const initialProgress: UserProgress = {
        day: currentDay,
        daysCompleted: 0,
        streak: 0,
        duration: 90,
        selectedBook: 'nehemiah'
      };
      saveUserProgress(initialProgress);
    }
  } catch (error) {
    console.error('[Journey] Error initializing journey:', error);
  }
}

export function getWorkoutDifficulty(): 'Beginner' | 'Intermediate' | 'Advanced' {
  try {
    const saved = localStorage.getItem('cornerstone_workout_difficulty');
    return (saved as 'Beginner' | 'Intermediate' | 'Advanced') || 'Intermediate';
  } catch (error) {
    console.error('[Workout] Error getting difficulty:', error);
    return 'Intermediate';
  }
}

export function setWorkoutDifficulty(difficulty: 'Beginner' | 'Intermediate' | 'Advanced') {
  try {
    localStorage.setItem('cornerstone_workout_difficulty', difficulty);
  } catch (error) {
    console.error('[Workout] Error setting difficulty:', error);
  }
}

export function getTodayCompletionStatus(day: number) {
  try {
    const key = `cornerstone_completion_day_${day}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      readingComplete: false,
      workoutComplete: false,
      bothComplete: false
    };
  } catch (error) {
    console.error('[Completion] Error getting completion status:', error);
    return {
      readingComplete: false,
      workoutComplete: false,
      bothComplete: false
    };
  }
}

export function markReadingComplete(day: number) {
  try {
    const key = `cornerstone_completion_day_${day}`;
    const current = getTodayCompletionStatus(day);
    const updated = { ...current, readingComplete: true, bothComplete: current.workoutComplete };
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error('[Completion] Error marking reading complete:', error);
  }
}

export function markWorkoutComplete(day: number) {
  try {
    const key = `cornerstone_completion_day_${day}`;
    const current = getTodayCompletionStatus(day);
    const updated = { ...current, workoutComplete: true, bothComplete: current.readingComplete };
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error('[Completion] Error marking workout complete:', error);
  }
}

export function setPreviewDay(day: number | null) {
  try {
    if (day === null) {
      localStorage.removeItem('cornerstone_preview_day');
    } else {
      localStorage.setItem('cornerstone_preview_day', day.toString());
    }
  } catch (error) {
    console.error('[Preview] Error setting preview day:', error);
  }
}

export function getPreviewDay(): number | null {
  try {
    const saved = localStorage.getItem('cornerstone_preview_day');
    return saved ? parseInt(saved, 10) : null;
  } catch (error) {
    console.error('[Preview] Error getting preview day:', error);
    return null;
  }
}

export function isPreviewMode(): boolean {
  return getPreviewDay() !== null;
}

export function exitPreviewMode() {
  setPreviewDay(null);
}
