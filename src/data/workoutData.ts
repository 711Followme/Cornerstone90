import { WorkoutExercise, DailyWorkout } from './journeyData';

/**
 * CORNERSTONE: 90 - Complete 90-Day Workout Data
 * Progressive training built on solid foundation with 4 phases and weekly Sabbath rest
 * Built on Christ. Rebuilt in Him. Standing Firm.
 */

// Helper function to calculate progressive multipliers
const getPhaseMultiplier = (day: number): number => {
  const week = Math.ceil(day / 7);
  
  // Phase 1: Foundation (Weeks 1-4) - Laying the Cornerstone
  if (week <= 4) return 1.0 + ((week - 1) * 0.1);
  
  // Phase 2: Building (Weeks 5-8) - Raising the Walls
  if (week <= 8) return 1.4 + ((week - 5) * 0.1);
  
  // Phase 3: Intensification (Weeks 9-12) - Securing the Structure
  if (week <= 12) return 1.8 + ((week - 9) * 0.1);
  
  // Phase 4: Completion (Week 13) - Standing Firm
  return 2.1;
};

// Deload week check
const isDeloadWeek = (day: number): boolean => {
  const week = Math.ceil(day / 7);
  return week === 4 || week === 8 || week === 12;
};

// Get phase name
const getPhaseName = (day: number): string => {
  const week = Math.ceil(day / 7);
  if (week <= 4) return 'Foundation';
  if (week <= 8) return 'Building';
  if (week <= 12) return 'Intensification';
  return 'Completion';
};

// Sabbath workout data
const getSabbathWorkout = (day: number): any => {
  return {
    title: 'Sabbath Rest',
    duration: 'Rest Day',
    difficulty: 'Rest',
    isSabbath: true,
    warmup: 'Today is for rest and recovery. This is not laziness - this is obedience. Rest is part of building on the solid foundation.',
    exercises: [],
    cooldown: 'Enjoy intentional rest, spiritual renewal, and family time.',
    spiritualConnection: 'God commands rest not as weakness, but as wisdom. Rest is not stopping - it\'s strategic pausing. Even Christ rested. You rest not because your work is done, but because God is good and His foundation is unshakeable.',
    sabbathActivities: [
      {
        category: 'Physical Rest',
        activities: [
          'Gentle full-body stretching (15-20 min)',
          'Light walk in nature (30-60 min)',
          'Gentle yoga or mobility work (20-30 min)',
          'Swimming or easy bike ride (30-45 min)'
        ]
      },
      {
        category: 'Spiritual Renewal',
        activities: [
          'Extended prayer time (30+ min)',
          'Scripture meditation and journaling',
          'Church/worship service',
          'Family devotions',
          'Communion with God and family'
        ]
      },
      {
        category: 'Relational Investment',
        activities: [
          'Quality unrushed time with wife',
          'Present time with children (phones away)',
          'Connect with brothers',
          'Serve others in your community',
          'Sabbath meal with intentional conversation'
        ]
      },
      {
        category: 'Mental Rest',
        activities: [
          'Reading (physical books)',
          'Journaling and reflection',
          'Hobby time (woodworking, art, music)',
          'Guilt-free nap (30-60 min)',
          'Limit screens and social media'
        ]
      }
    ]
  };
};

// Base workout templates for each day of the week
const getBaseWorkout = (dayOfWeek: number, day: number, difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): any => {
  const multiplier = getPhaseMultiplier(day);
  const isDeload = isDeloadWeek(day);
  const phase = getPhaseName(day);
  const week = Math.ceil(day / 7);
  
  // Apply deload reduction
  const deloadMultiplier = isDeload ? 0.7 : 1.0;
  const finalMultiplier = multiplier * deloadMultiplier;

  // Base sets and reps for each difficulty
  const baseSets = {
    Beginner: { push: 3, pull: 3, legs: 3, core: 3, full: 3, challenge: 1 },
    Intermediate: { push: 4, pull: 4, legs: 4, core: 4, full: 4, challenge: 1 },
    Advanced: { push: 5, pull: 5, legs: 5, core: 5, full: 5, challenge: 1 }
  };

  const baseReps = {
    Beginner: { push: 8, pull: 6, legs: 12, core: 10, full: 8, challenge: 50 },
    Intermediate: { push: 12, pull: 10, legs: 15, core: 15, full: 12, challenge: 100 },
    Advanced: { push: 15, pull: 12, legs: 20, core: 20, full: 15, challenge: 150 }
  };

  const calculateReps = (base: number): string => {
    const adjusted = Math.round(base * finalMultiplier);
    return `${Math.max(5, adjusted - 3)}-${adjusted}`;
  };

  const calculateSets = (base: number): number => {
    return Math.max(2, Math.round(base * (isDeload ? 0.7 : 1.0)));
  };

  // Day 1: Upper Body Push
  if (dayOfWeek === 1) {
    const sets = baseSets[difficulty];
    const reps = baseReps[difficulty];
    
    let exercises: WorkoutExercise[] = [
      {
        name: week <= 4 ? 'Push-ups' : week <= 8 ? 'Push-ups (tempo 3-1-3)' : 'Explosive Push-ups',
        sets: calculateSets(sets.push),
        reps: calculateReps(reps.push),
        description: week <= 4 ? 'Classic push-ups for chest, shoulders, and triceps' : week <= 8 ? 'Slow tempo push-ups for time under tension' : 'Explosive push-ups for power development',
        formTips: ['Keep body straight', 'Lower chest to ground', 'Full range of motion', week > 4 ? 'Control the tempo' : '', week > 8 ? 'Explosive push from bottom' : ''].filter(Boolean),
        videoUrl: day === 1 ? 'https://vimeo.com/122357903' : undefined,
        videoPlaceholder: 'push-ups-demo.mp4'
      },
      {
        name: week <= 4 ? 'Pike Push-ups' : week <= 8 ? 'Pike Push-ups (elevated feet)' : 'Handstand Push-ups (assisted)',
        sets: calculateSets(sets.push - 1),
        reps: calculateReps(Math.round(reps.push * 0.8)),
        description: 'Target shoulders with pike position',
        formTips: ['Hips high', 'Head between arms', 'Control the movement', week > 8 ? 'Wall-assisted if needed' : ''].filter(Boolean),
        videoPlaceholder: 'pike-pushups-demo.mp4'
      },
      {
        name: difficulty === 'Beginner' ? 'Bench Dips' : 'Dips',
        sets: calculateSets(sets.push - 1),
        reps: calculateReps(Math.round(reps.push * 0.8)),
        description: 'Tricep focused movement',
        formTips: ['Elbows back', 'Shoulders down', 'Full extension', week > 8 ? 'Add weight if possible' : ''].filter(Boolean),
        videoPlaceholder: 'dips-demo.mp4'
      },
      {
        name: week <= 8 ? 'Plank Hold' : 'Weighted Plank Hold',
        sets: calculateSets(sets.push),
        duration: `${Math.round(30 * finalMultiplier)}-${Math.round(60 * finalMultiplier)}s`,
        reps: `${Math.round(30 * finalMultiplier)}-${Math.round(60 * finalMultiplier)}s`,
        description: 'Core stability hold',
        formTips: ['Straight body line', 'Engage core', 'Breathe steadily'],
        videoPlaceholder: 'plank-demo.mp4'
      }
    ];

    return {
      title: `Upper Body Push - ${phase} Phase`,
      duration: '25-35 min',
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      isSabbath: false,
      warmup: '5-10 minutes: Arm circles, shoulder rolls, light cardio, push-up negatives',
      exercises,
      cooldown: '5-10 minutes: Chest/shoulder/tricep stretches, deep breathing',
      spiritualConnection: 'Push through resistance. Built on Christ, we have strength to push against opposition. Every rep is choosing strength over comfort, just as we choose obedience over ease.',
      phaseInfo: isDeload ? `Week ${week} - DELOAD WEEK: Reduced volume for recovery` : `Week ${week} - ${phase} Phase: Progressive overload continues`
    };
  }

  // Day 2: Lower Body Strength
  if (dayOfWeek === 2) {
    const sets = baseSets[difficulty];
    const reps = baseReps[difficulty];
    
    let exercises: WorkoutExercise[] = [
      {
        name: week <= 4 ? 'Bodyweight Squats' : week <= 8 ? 'Jump Squats' : 'Pistol Squat Progressions',
        sets: calculateSets(sets.legs),
        reps: calculateReps(reps.legs),
        description: week <= 4 ? 'Fundamental leg exercise' : week <= 8 ? 'Explosive leg power' : 'Advanced single-leg strength',
        formTips: ['Knees track over toes', 'Weight in heels', 'Full depth', week > 8 ? 'Use assistance as needed' : ''].filter(Boolean),
        videoPlaceholder: 'squats-demo.mp4'
      },
      {
        name: week <= 4 ? 'Lunges' : week <= 8 ? 'Walking Lunges' : 'Bulgarian Split Squats',
        sets: calculateSets(sets.legs - 1),
        reps: calculateReps(Math.round(reps.legs * 0.8)) + ' each leg',
        description: 'Unilateral leg strength',
        formTips: ['90 degree angles', 'Front knee stable', 'Back knee hovers', week > 8 ? 'Rear foot elevated' : ''].filter(Boolean),
        videoPlaceholder: 'lunges-demo.mp4'
      },
      {
        name: week <= 8 ? 'Single-leg Deadlifts' : 'Single-leg Deadlifts (weighted)',
        sets: calculateSets(sets.legs - 1),
        reps: calculateReps(Math.round(reps.legs * 0.7)) + ' each leg',
        description: 'Balance and hamstring work',
        formTips: ['Hinge at hips', 'Straight back', 'Controlled movement'],
        videoPlaceholder: 'deadlift-demo.mp4'
      },
      {
        name: difficulty === 'Advanced' && week > 8 ? 'Single-leg Calf Raises' : 'Calf Raises',
        sets: calculateSets(sets.legs),
        reps: calculateReps(Math.round(reps.legs * 1.2)),
        description: 'Calf strengthening',
        formTips: ['Full extension', 'Controlled descent', 'Squeeze at top'],
        videoPlaceholder: 'calf-raises-demo.mp4'
      }
    ];

    return {
      title: `Lower Body Strength - ${phase} Phase`,
      duration: '30-40 min',
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      isSabbath: false,
      warmup: '5-10 minutes: Leg swings, hip circles, bodyweight squats, lunges',
      exercises,
      cooldown: '5-10 minutes: Quad/hamstring/calf stretches, hip flexor stretches',
      spiritualConnection: 'Build a strong foundation. Your spiritual life needs a solid base on the Cornerstone—Christ. Just as your legs support your entire body, your foundation in Him supports everything you do.',
      phaseInfo: isDeload ? `Week ${week} - DELOAD WEEK: Reduced volume for recovery` : `Week ${week} - ${phase} Phase: Building leg strength and power`
    };
  }

  // Day 3: Upper Body Pull
  if (dayOfWeek === 3) {
    const sets = baseSets[difficulty];
    const reps = baseReps[difficulty];
    
    let exercises: WorkoutExercise[] = [
      {
        name: difficulty === 'Beginner' ? (week <= 4 ? 'Inverted Rows' : 'Assisted Pull-ups') : (week <= 8 ? 'Pull-ups' : 'Weighted Pull-ups'),
        sets: calculateSets(sets.pull),
        reps: calculateReps(reps.pull),
        description: 'Primary back and bicep development',
        formTips: ['Full hang', 'Pull to chest', 'Control descent', week > 8 ? 'Add weight when ready' : ''].filter(Boolean),
        videoPlaceholder: 'pullups-demo.mp4'
      },
      {
        name: week <= 8 ? 'Inverted Rows' : 'Wide-grip Inverted Rows',
        sets: calculateSets(sets.pull - 1),
        reps: calculateReps(Math.round(reps.pull * 1.2)),
        description: 'Horizontal pulling movement',
        formTips: ['Body straight', 'Pull chest to bar', 'Squeeze shoulder blades'],
        videoPlaceholder: 'rows-demo.mp4'
      },
      {
        name: week <= 4 ? 'Bicep Curls' : 'Bicep Curls (slow tempo)',
        sets: calculateSets(sets.pull - 1),
        reps: calculateReps(Math.round(reps.pull * 1.0)),
        description: 'Isolated arm work',
        formTips: ['Elbows stable', 'Control the weight', 'Full range', week > 4 ? '3 second negative' : ''].filter(Boolean),
        videoPlaceholder: 'curls-demo.mp4'
      },
      {
        name: 'Face Pulls',
        sets: calculateSets(sets.pull),
        reps: calculateReps(Math.round(reps.pull * 1.3)),
        description: 'Rear delt and posture correction',
        formTips: ['Pull to face level', 'External rotation', 'Squeeze back'],
        videoPlaceholder: 'facepulls-demo.mp4'
      }
    ];

    return {
      title: `Upper Body Pull - ${phase} Phase`,
      duration: '30-40 min',
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      isSabbath: false,
      warmup: '5-10 minutes: Arm circles, dead hangs, scapular pulls, band pull-aparts',
      exercises,
      cooldown: '5-10 minutes: Back/bicep/forearm stretches, shoulder mobility',
      spiritualConnection: 'Pull yourself up. Just as you draw near to God through Christ our Cornerstone, He draws near to you. Keep pulling, keep reaching, keep climbing toward Him.',
      phaseInfo: isDeload ? `Week ${week} - DELOAD WEEK: Reduced volume for recovery` : `Week ${week} - ${phase} Phase: Building pulling strength`
    };
  }

  // Day 4: Core & Conditioning
  if (dayOfWeek === 4) {
    const sets = baseSets[difficulty];
    const reps = baseReps[difficulty];
    
    let exercises: WorkoutExercise[] = [
      {
        name: week <= 4 ? 'Burpees' : week <= 8 ? 'Burpees (jump variation)' : 'Burpee Box Jumps',
        sets: calculateSets(sets.core),
        reps: calculateReps(Math.round(reps.core * 1.2)),
        description: 'Full body conditioning',
        formTips: ['Quick transitions', 'Full push-up', 'Explosive jump', week > 8 ? 'Add box jump' : ''].filter(Boolean),
        videoPlaceholder: 'burpees-demo.mp4'
      },
      {
        name: 'Mountain Climbers',
        sets: calculateSets(sets.core),
        duration: `${Math.round(30 * finalMultiplier)}-${Math.round(60 * finalMultiplier)}s`,
        reps: `${Math.round(30 * finalMultiplier)}-${Math.round(60 * finalMultiplier)}s`,
        description: 'Cardio and core stability',
        formTips: ['Fast pace', 'Hips level', 'Drive knees'],
        videoPlaceholder: 'mountain-climbers-demo.mp4'
      },
      {
        name: week <= 4 ? 'Russian Twists' : week <= 8 ? 'Russian Twists (weighted)' : 'V-ups',
        sets: calculateSets(sets.core),
        reps: calculateReps(reps.core * 2),
        description: week <= 8 ? 'Rotational core work' : 'Advanced core strength',
        formTips: ['Lean back', 'Rotate fully', 'Control movement', week > 8 ? 'Touch hands to toes' : ''].filter(Boolean),
        videoPlaceholder: 'core-rotation-demo.mp4'
      },
      {
        name: week <= 4 ? 'Leg Raises' : week <= 8 ? 'Hanging Leg Raises' : 'Dragon Flag Progressions',
        sets: calculateSets(sets.core),
        reps: calculateReps(Math.round(reps.core * 0.8)),
        description: 'Lower ab focus',
        formTips: ['Control the movement', 'No swinging', 'Full range'],
        videoPlaceholder: 'leg-raises-demo.mp4'
      }
    ];

    return {
      title: `Core & Conditioning - ${phase} Phase`,
      duration: '25-35 min',
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      isSabbath: false,
      warmup: '5-10 minutes: Jumping jacks, high knees, torso rotations, cat-cow stretches',
      exercises,
      cooldown: '5-10 minutes: Full body stretching, deep breathing, core stretches',
      spiritualConnection: 'Core strength - your identity in Christ must be unshakeable. When storms come, your core foundation on the Cornerstone determines if you stand or fall.',
      phaseInfo: isDeload ? `Week ${week} - DELOAD WEEK: Reduced volume for recovery` : `Week ${week} - ${phase} Phase: Building core endurance`
    };
  }

  // Day 5: Full Body Power
  if (dayOfWeek === 5) {
    const sets = baseSets[difficulty];
    const reps = baseReps[difficulty];
    
    let exercises: WorkoutExercise[] = [
      {
        name: week <= 4 ? 'Jump Squats' : week <= 8 ? 'Broad Jumps' : 'Box Jumps',
        sets: calculateSets(sets.full),
        reps: calculateReps(Math.round(reps.full * 1.0)),
        description: 'Explosive leg power',
        formTips: ['Full squat', 'Explosive jump', 'Soft landing', week > 8 ? 'Max height focus' : ''].filter(Boolean),
        videoPlaceholder: 'jump-squats-demo.mp4'
      },
      {
        name: week <= 4 ? 'Push-up to T' : week <= 8 ? 'Spiderman Push-ups' : 'Archer Push-ups',
        sets: calculateSets(sets.full),
        reps: calculateReps(Math.round(reps.full * 0.8)) + (week > 4 ? ' each side' : ' each side'),
        description: 'Dynamic push-up variation',
        formTips: ['Control rotation', 'Full push-up', 'Stable core'],
        videoPlaceholder: 'dynamic-pushups-demo.mp4'
      },
      {
        name: week <= 8 ? 'Step-ups' : 'Jumping Step-ups',
        sets: calculateSets(sets.full),
        reps: calculateReps(Math.round(reps.full * 0.9)) + ' each leg',
        description: 'Unilateral power',
        formTips: ['Drive through heel', 'Full extension', week > 8 ? 'Explosive push-off' : 'Controlled movement'].filter(Boolean),
        videoPlaceholder: 'stepups-demo.mp4'
      },
      {
        name: week <= 4 ? 'Plank to Downward Dog' : week <= 8 ? 'Plank to Pike' : 'Burpee to Pike',
        sets: calculateSets(sets.full),
        reps: calculateReps(Math.round(reps.full * 1.0)),
        description: 'Dynamic core and mobility',
        formTips: ['Smooth transitions', 'Pike hips high', 'Control'],
        videoPlaceholder: 'dynamic-plank-demo.mp4'
      }
    ];

    return {
      title: `Full Body Power - ${phase} Phase`,
      duration: '30-40 min',
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      isSabbath: false,
      warmup: '5-10 minutes: Dynamic warm-up, jump rope, leg swings, arm circles',
      exercises,
      cooldown: '5-10 minutes: Full body stretching, focus on explosive muscles',
      spiritualConnection: 'Whole being integration. God calls for your entire self - body, mind, and spirit - all working together in unity and power, built on the solid foundation of Christ.',
      phaseInfo: isDeload ? `Week ${week} - DELOAD WEEK: Reduced volume for recovery` : `Week ${week} - ${phase} Phase: Building explosive power`
    };
  }

  // Day 6: Challenge Day
  if (dayOfWeek === 6) {
    const reps = baseReps[difficulty];
    const pushups = Math.round(reps.challenge * finalMultiplier);
    const squats = Math.round(reps.challenge * finalMultiplier);
    const situps = Math.round(reps.challenge * finalMultiplier);
    
    let exercises: WorkoutExercise[] = [
      {
        name: `${pushups} Push-ups`,
        reps: `${pushups} total`,
        description: 'Total volume challenge - break into sets',
        formTips: ['Maintain form throughout', 'Break into manageable sets', 'Complete all reps'],
        videoPlaceholder: 'challenge-pushups-demo.mp4'
      },
      {
        name: `${squats} Squats`,
        reps: `${squats} total`,
        description: 'Leg endurance test',
        formTips: ['Full depth each rep', 'Break into sets', 'Keep moving'],
        videoPlaceholder: 'challenge-squats-demo.mp4'
      },
      {
        name: `${situps} Sit-ups`,
        reps: `${situps} total`,
        description: 'Core endurance challenge',
        formTips: ['Full range of motion', 'Controlled reps', 'Pace yourself'],
        videoPlaceholder: 'challenge-situps-demo.mp4'
      },
      {
        name: week <= 4 ? '0.5-mile Run' : week <= 8 ? '1-mile Run' : '1.5-mile Run',
        duration: week <= 4 ? '5-8 min' : week <= 8 ? '8-12 min' : '12-18 min',
        reps: week <= 4 ? '5-8 min' : week <= 8 ? '8-12 min' : '12-18 min',
        description: 'Cardio finisher',
        formTips: ['Steady pace', 'Breathe rhythmically', 'Finish strong'],
        videoPlaceholder: 'running-demo.mp4'
      }
    ];

    return {
      title: `Challenge Day - ${phase} Phase`,
      duration: week <= 4 ? '30-40 min' : week <= 8 ? '40-50 min' : '50-60 min',
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      isSabbath: false,
      warmup: '10 minutes: Thorough full-body warm-up, prepare mentally',
      exercises,
      cooldown: '10 minutes: Extended stretching and recovery',
      spiritualConnection: 'Perseverance. You finish what you start. Built on the unshakeable Cornerstone, you cannot be moved. When it gets hard, you keep going. That\'s what separates men from boys.',
      phaseInfo: isDeload ? `Week ${week} - DELOAD WEEK: Reduced challenge volume` : `Week ${week} - ${phase} Phase: Mental toughness test`
    };
  }

  // Default fallback
  return getSabbathWorkout(day);
};

// Main function to generate workout for any day
export const generateCompleteWorkout = (day: number, difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate'): any => {
  const dayOfWeek = ((day - 1) % 7) + 1;
  
  // Sabbath
  if (dayOfWeek === 7) {
    return getSabbathWorkout(day);
  }
  
  // Regular workout days
  return getBaseWorkout(dayOfWeek, day, difficulty);
};

// Export individual day lookups for all 90 days
export const get90DayWorkouts = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate'): DailyWorkout[] => {
  return Array.from({ length: 90 }, (_, i) => generateCompleteWorkout(i + 1, difficulty));
};

export default generateCompleteWorkout;
