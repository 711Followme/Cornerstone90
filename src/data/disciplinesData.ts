export interface Discipline {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'spiritual' | 'physical' | 'mental' | 'relational';
}

export interface Vision {
  why: string;
  who: string;
  goals: string[];
  obstacles: string[];
  commitment: string;
}

export const defaultDisciplines: Discipline[] = [
  {
    id: 'prayer',
    name: 'Daily Prayer',
    description: '15 minutes of focused prayer',
    icon: '🙏',
    category: 'spiritual'
  },
  {
    id: 'bible',
    name: 'Bible Reading',
    description: 'Complete daily reading',
    icon: '📖',
    category: 'spiritual'
  },
  {
    id: 'workout',
    name: 'Physical Training',
    description: 'Complete daily workout',
    icon: '💪',
    category: 'physical'
  },
  {
    id: 'water',
    name: 'Hydration',
    description: 'Drink 8 glasses of water',
    icon: '💧',
    category: 'physical'
  },
  {
    id: 'fast',
    name: 'Fasting',
    description: 'Keep your chosen fast',
    icon: '🍽️',
    category: 'spiritual'
  },
  {
    id: 'journal',
    name: 'Journaling',
    description: 'Reflect and write',
    icon: '✍️',
    category: 'mental'
  },
  {
    id: 'family',
    name: 'Family Time',
    description: 'Quality time with family',
    icon: '👨‍👩‍👧‍👦',
    category: 'relational'
  },
  {
    id: 'accountability',
    name: 'Check-in',
    description: 'Connect with accountability partner',
    icon: '🤝',
    category: 'relational'
  }
];

// Get today's date key
function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

// Get disciplines for today
export function getTodayDisciplines(): Discipline[] {
  const saved = localStorage.getItem('cornerstone_disciplines');
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultDisciplines;
}

// Save custom disciplines
export function saveDisciplines(disciplines: Discipline[]) {
  localStorage.setItem('cornerstone_disciplines', JSON.stringify(disciplines));
}

// Get completion status for today
export function getTodayCompletion(): Record<string, boolean> {
  const key = `cornerstone_completion_${getTodayKey()}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }
  return {};
}

// Mark discipline as complete
export function markDisciplineComplete(disciplineId: string, completed: boolean) {
  const key = `cornerstone_completion_${getTodayKey()}`;
  const current = getTodayCompletion();
  current[disciplineId] = completed;
  localStorage.setItem(key, JSON.stringify(current));
}

// Get completion rate for today
export function getTodayCompletionRate(): number {
  const disciplines = getTodayDisciplines();
  const completion = getTodayCompletion();
  const completed = Object.values(completion).filter(Boolean).length;
  return Math.round((completed / disciplines.length) * 100);
}

// Vision management
export function getVision(): Vision | null {
  const saved = localStorage.getItem('cornerstone_vision');
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

export function saveVision(vision: Vision) {
  localStorage.setItem('cornerstone_vision', JSON.stringify(vision));
}

// Get completion history
export function getCompletionHistory(days: number = 7): Array<{ date: string; rate: number }> {
  const history: Array<{ date: string; rate: number }> = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const key = `cornerstone_completion_${dateKey}`;
    const saved = localStorage.getItem(key);
    
    if (saved) {
      const completion = JSON.parse(saved);
      const disciplines = getTodayDisciplines();
      const completed = Object.values(completion).filter(Boolean).length;
      const rate = Math.round((completed / disciplines.length) * 100);
      history.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate
      });
    } else {
      history.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: 0
      });
    }
  }
  
  return history;
}
