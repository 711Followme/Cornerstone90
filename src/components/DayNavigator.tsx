import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { getCurrentDayFromCalendar, getCalendarDateForDay } from '@/data/journeyData';

interface DayNavigatorProps {
  currentDay: number;
  onDayChange: (day: number) => void;
  maxDay: number;
}

const DayNavigator: React.FC<DayNavigatorProps> = ({ currentDay, onDayChange, maxDay }) => {
  const calendarDay = getCurrentDayFromCalendar();
  const isViewingPast = currentDay < calendarDay;
  const isViewingFuture = currentDay > calendarDay;
  
  const canGoPrevious = currentDay > 1;
  const canGoNext = currentDay < Math.min(calendarDay, maxDay);
  
  const handlePrevious = () => {
    if (canGoPrevious) {
      onDayChange(currentDay - 1);
    }
  };
  
  const handleNext = () => {
    if (canGoNext) {
      onDayChange(currentDay + 1);
    }
  };
  
  const handleToday = () => {
    onDayChange(calendarDay);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="text-cornerstone-blue" size={20} />
            <div>
              <p className="font-bold text-cornerstone-charcoal">
                Day {currentDay} of {maxDay}
              </p>
              <p className="text-xs text-cornerstone-stone">
                {getCalendarDateForDay(currentDay)}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>

      {isViewingPast && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-sm text-blue-800 mb-2">
            📖 Viewing past content - Day {currentDay}
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={handleToday}
            className="bg-cornerstone-blue hover:bg-cornerstone-blue-dark"
          >
            Jump to Today (Day {calendarDay})
          </Button>
        </div>
      )}

      {isViewingFuture && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <p className="text-sm text-yellow-800">
            🔒 This content is not available yet. Current day is {calendarDay}.
          </p>
        </div>
      )}
    </div>
  );
};

export default DayNavigator;
