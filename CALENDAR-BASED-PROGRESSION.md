# 📅 Calendar-Based Day Progression - Complete Guide

## 🎯 Overview

Cornerstone: 90 now uses a **fixed calendar-based progression system** starting January 5, 2026 (Central Time).

### Key Features:
- ✅ **Fixed Start Date:** January 5, 2026 CT
- ✅ **Calendar Sync:** Current day calculated from calendar
- ✅ **Backward Navigation:** View any past day
- ✅ **Future Locked:** Cannot view future days
- ✅ **Universal Day:** All users see same current day
- ✅ **Independent Completion:** Track completion separately from progression

---

## 📆 How It Works

### Program Start Date:
```
January 5, 2026 @ 00:00:00 Central Time
```

### Current Day Calculation:
```typescript
Today's Date (CT) - January 5, 2026 = Days Elapsed
Current Day = Days Elapsed + 1
```

### Example Timeline:
```
January 5, 2026  → Day 1  (Program Start)
January 6, 2026  → Day 2
January 7, 2026  → Day 3
...
April 4, 2026    → Day 90 (Last Day)
```

---

## 🧭 Navigation Rules

### ✅ Allowed:
- View **current day** (today)
- Navigate **backward** to any past day
- Jump to **today** from any past day
- Review past readings/workouts

### ❌ Not Allowed:
- View **future days** (beyond today)
- Navigate **forward** past current day
- Complete readings for future days
- Skip ahead in progression

---

## 🎯 User Experience

### Scenario 1: New User (Day 2)
```
- Opens app on January 6, 2026
- Sees Day 2 content
- Can view Day 1 (backward)
- Cannot view Day 3+ (future locked)
```

### Scenario 2: User Behind Schedule
```
- Missed Day 1
- Opens app on January 6, 2026
- Still sees Day 2 as current
- Can go back to complete Day 1
- Completion tracked separately
```

### Scenario 3: User Reviewing Past
```
- Currently on Day 10
- Wants to review Day 5
- Clicks "Previous" to navigate back
- Views Day 5 content (read-only)
- Clicks "Today" to return to Day 10
```

---

## 🔧 Technical Implementation

### Fixed Start Date:
```typescript
const PROGRAM_START_DATE = '2026-01-05';
```

### Current Day Calculation:
```typescript
export const getCurrentDayFromCalendar = (): number => {
  const now = new Date();
  const centralTime = new Date(now.toLocaleString('en-US', { 
    timeZone: 'America/Chicago' 
  }));
  const startDate = new Date('2026-01-05T00:00:00-06:00');
  
  const diffTime = centralTime.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const currentDay = diffDays + 1;
  return Math.max(1, Math.min(currentDay, 90));
};
```

### Future Day Check:
```typescript
export const isDayInFuture = (day: number): boolean => {
  const currentDay = getCurrentDayFromCalendar();
  return day > currentDay;
};
```

---

## 📊 Completion Tracking

### Independent System:
- Completion tracked **separately** from calendar day
- Can complete past days anytime
- Completion status saved per day
- Streak calculated based on completions

### Example:
```
January 6, 2026 (Day 2):
- User completes Day 2 reading ✅
- User completes Day 2 workout ✅
- Goes back and completes Day 1 ✅
- Both days marked complete
- Streak: 2 days
- Current calendar day: Still Day 2
```

---

## 🎮 DayNavigator Component

### Features:
- **Previous Button:** Go to previous day
- **Next Button:** Go to next day (up to today)
- **Today Button:** Jump to current day
- **Date Display:** Shows actual calendar date
- **Status Indicator:** "Viewing past day" when not on today

### Usage:
```tsx
<DayNavigator 
  currentDay={viewingDay}
  onDayChange={handleDayChange}
  maxDay={90}
/>
```

### Visual States:
```
On Current Day:
[← Previous]  [Day 2 - Jan 6, 2026]  [Next →]
                     (disabled)

On Past Day:
[← Previous]  [Day 1 - Jan 5, 2026]  [Today (Day 2)]
                 Viewing past day
```

---

## 🔄 Data Flow

### On App Load:
```
1. Get current date/time in Central Time
2. Calculate days since January 5, 2026
3. Set current day = days elapsed + 1
4. Load completion status for current day
5. Display current day content
```

### On Day Navigation:
```
1. User clicks Previous/Next
2. Update viewing day
3. Load content for that day
4. Load completion status
5. Show "viewing past" indicator if not today
6. Disable completion if viewing past day
```

### On Completion:
```
1. Check if viewing today
2. Verify reflection written
3. Mark reading/workout complete for current day
4. Update completion stats
5. Don't advance to next day (calendar controls that)
```

---

## ⏰ Time Zone Handling

### Central Time (America/Chicago):
- All calculations use CT
- Converts user's local time to CT
- Day changes at midnight CT
- Works for users in any timezone

### Example:
```
User in California (PST):
- 10 PM PST on Jan 5 = Still Day 1
- 11 PM PST on Jan 5 = Midnight CT = Day 2
```

---

## 📱 User Interface Updates

### Dashboard (Index.tsx):
- Shows current calendar day
- Can't complete future tasks
- Past days shown as completed/incomplete

### Daily Reading Page:
- DayNavigator at top
- Shows current or past day
- Completion only allowed for today
- "Viewing past day" banner when not on today

### Workout Page:
- Same DayNavigator
- Same viewing restrictions
- Same completion rules

---

## 🧪 Testing Scenarios

### Test 1: Check Current Day
```
1. Open app on January 6, 2026
2. Should show Day 2
3. Dashboard should say "Day 2 of 90"
4. Console: [Journey] Calendar calculation shows Day 2
```

### Test 2: Navigate Backward
```
1. On Day 2, click "Previous"
2. Should show Day 1 content
3. Should show "Viewing past day" banner
4. Should show "Today (Day 2)" button
```

### Test 3: Try to Go Forward
```
1. On Day 2 (current day)
2. "Next" button should be disabled
3. Cannot view Day 3 or beyond
```

### Test 4: Complete Past Day
```
1. Navigate to Day 1
2. Try to complete reading
3. Should show error: "Can't complete past days"
4. Must return to today to mark complete
```

### Test 5: Jump to Today
```
1. Navigate to Day 1
2. Click "Today (Day 2)" button
3. Should immediately show Day 2
4. Can now complete today's tasks
```

---

## 🚨 Important Notes

### What Changed:
- ❌ **Old:** Day advanced after completion
- ✅ **New:** Day set by calendar date

### Impact on Users:
- ✅ Can review past content anytime
- ✅ Can't accidentally skip ahead
- ✅ Everyone on same day (community sync)
- ✅ Clear progression timeline
- ❌ Can't "binge" multiple days

### Completion Strategy:
```
✅ Complete current day tasks daily
✅ Go back to catch up if missed days
✅ Track completion independently
✅ Build consistent habits
❌ Can't rush through program
```

---

## 📅 Program Timeline

### Full 90-Day Schedule:
```
Week 1:  Jan 5  - Jan 11  (Days 1-7)
Week 2:  Jan 12 - Jan 18  (Days 8-14)
Week 3:  Jan 19 - Jan 25  (Days 15-21)
Week 4:  Jan 26 - Feb 1   (Days 22-28)
...
Week 13: Apr 1 - Apr 4    (Days 85-90)

Last Day: April 4, 2026 (Day 90)
```

### Key Dates:
- **Start:** January 5, 2026 (Day 1)
- **Mid-Point:** February 19, 2026 (Day 45)
- **End:** April 4, 2026 (Day 90)

---

## 💡 Benefits

### For Users:
1. **Clear Structure:** Know exactly what day it is
2. **Community Sync:** Everyone on same day
3. **Flexibility:** Review past content anytime
4. **Accountability:** Can't skip ahead
5. **Progress Tracking:** See completion vs. calendar

### For Program:
1. **Consistent Experience:** All users aligned
2. **Better Analytics:** Track by calendar date
3. **Content Planning:** Schedule updates by date
4. **Community Events:** Schedule on specific days

---

## 🔮 Future Enhancements

### Planned Features:
- [ ] Show upcoming days preview (locked)
- [ ] Calendar view of all 90 days
- [ ] Completion heatmap
- [ ] Missed days reminder
- [ ] Weekly recap on Sundays
- [ ] Special milestone days (30, 60, 90)

---

## 📞 Support

### Common Questions:

**Q: What if I miss a day?**
A: You can always go back and complete it. Current day stays on calendar schedule.

**Q: Can I complete multiple days at once?**
A: You can only complete today's tasks. Must navigate back for past days.

**Q: What happens after Day 90?**
A: Program ends on April 4, 2026. You'll see completion summary.

**Q: What timezone is used?**
A: Central Time (America/Chicago). Auto-converts your local time.

**Q: Can I change the start date?**
A: For testing, yes (edit `PROGRAM_START_DATE`). For production, it's fixed to January 5, 2026.

---

## ✅ Summary

**Calendar-Based System:**
- ✅ Fixed start: January 5, 2026 CT
- ✅ Current day = calendar calculation
- ✅ Backward navigation allowed
- ✅ Forward navigation blocked
- ✅ Completion tracked separately
- ✅ Universal progression for all users

**Result:** Structured, accountable, community-synced 90-day journey! 🏛️📅
