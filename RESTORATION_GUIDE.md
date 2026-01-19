# CORNERSTONE: 90 - COMPLETE RESTORATION GUIDE

## 📦 WHAT TO DOWNLOAD AND SAVE LOCALLY

Download these files from your Layout project:

### 1. **Core Backup Files** (Download from project root)
- `PROJECT_BACKUP_COMPLETE.md` - Main backup with core code
- `RESTORATION_GUIDE.md` - This file
- `SUPABASE_SETUP.md` - Database setup SQL

### 2. **Source Code Files** (Download entire src/ folder)
All files are restored in the project. Download the complete `src/` directory which includes:

**Data Files:**
- `src/data/journeyData.ts` - Journey management & workout system
- `src/data/nehemiahReadings.ts` - All 14 days of devotionals (CRITICAL!)
- `src/data/disciplinesData.ts` - Habit tracking system

**Pages:**
- `src/pages/Index.tsx` - Dashboard
- `src/pages/Reading.tsx` - Daily reading view
- `src/pages/Workout.tsx` - Workout routines
- `src/pages/Disciplines.tsx` - Habit tracker
- `src/pages/Progress.tsx` - Analytics
- `src/pages/VisionSetup.tsx` - Goal setting
- `src/pages/Brotherhood.tsx` - Community
- `src/pages/Profile.tsx` - User profile

**Components:**
- `src/components/AppSidebar.tsx` - Navigation sidebar
- `src/components/BrotherhoodChat.tsx` - Real-time chat
- `src/components/ui/` - ShadCN components (READ ONLY - don't modify)

**Context & Services:**
- `src/contexts/AuthContext.tsx` - User authentication
- `src/services/chatService.ts` - Chat functionality
- `src/services/profileService.ts` - Profile management
- `src/lib/supabase.ts` - Supabase client
- `src/lib/utils.ts` - Utilities

**Config:**
- `src/App.tsx` - Main app with routes
- `src/main.tsx` - Entry point
- `src/index.css` - Styles with Cornerstone theme

### 3. **Configuration Files** (Download from root)
- `package.json` - Dependencies list
- `tailwind.config.js` - Tailwind configuration
- `index.html` - HTML entry
- `vite.config.ts` - Vite config
- `tsconfig.json` - TypeScript config

---

## 🔄 HOW TO RESTORE FROM BACKUP

### Option A: Restore in Layout.dev
1. Open your Layout project
2. Use the chat to upload this guide
3. Say: "Restore my project using the backup files"
4. Layout AI will recreate all files

### Option B: Restore Locally
1. Create new project: `npm create vite@latest cornerstone-90 -- --template react-ts`
2. Install dependencies from package.json
3. Copy all files from backup to corresponding locations
4. Run `npm install`
5. Setup Supabase (see below)

---

## 🗄️ SUPABASE SETUP (CRITICAL!)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Save your project URL and anon key

### Step 2: Add Environment Variables
Create `.env.local` file:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Run SQL Migration
1. Open Supabase dashboard → SQL Editor
2. Copy SQL from `SUPABASE_SETUP.md`
3. Run all three sections:
   - Create profiles table
   - Create chat_messages table
   - Enable realtime

### Step 4: Verify Setup
- Go to Table Editor in Supabase
- Confirm `profiles` and `chat_messages` tables exist
- Go to Database → Replication
- Confirm `chat_messages` has realtime enabled

---

## 📋 DEPENDENCIES TO INSTALL

```bash
npm install @supabase/supabase-js
npm install @tanstack/react-query
npm install react-router-dom
npm install recharts
npm install lucide-react
npm install @radix-ui/react-*  # (multiple packages - see package.json)
npm install tailwindcss-animate
npm install react-hook-form
npm install zod
```

Or simply run:
```bash
npm install
```

---

## 🎯 CRITICAL FILES TO BACKUP

**MOST IMPORTANT (DO NOT LOSE!):**
1. `src/data/nehemiahReadings.ts` - Contains all 14 days of devotional content (~6000 lines)
2. `src/data/journeyData.ts` - Workout system and journey management
3. `SUPABASE_SETUP.md` - Database setup SQL

**IMPORTANT:**
4. All page components (Index, Reading, Workout, etc.)
5. `src/contexts/AuthContext.tsx` - User authentication
6. `src/components/BrotherhoodChat.tsx` - Real-time chat
7. `src/services/` - All service files

**CONFIGURATION:**
8. `package.json` - Dependency list
9. `tailwind.config.js` - Theme configuration
10. `src/index.css` - Custom styles

---

## 🚀 QUICK START AFTER RESTORATION

1. **Install dependencies:** `npm install`
2. **Setup Supabase:** Follow Supabase setup above
3. **Run development server:** `npm run dev`
4. **Open browser:** http://localhost:5173
5. **Complete your profile:** Go to Profile page
6. **Test chat:** Go to Brotherhood page

---

## 📍 WHERE TO FIND FILES IN CHAT HISTORY

All files were restored in batches:

- **BATCH 1:** Core data (journeyData.ts)
- **BATCH 2:** Nehemiah readings (Days 1-14)
- **BATCH 3:** Disciplines data
- **BATCH 4:** Pages (Index, Reading, Workout)
- **BATCH 5:** Pages (Disciplines, Progress, Vision, Brotherhood, Profile)
- **BATCH 6:** Supabase integration (Auth, Services, Chat)

Search the conversation for these batch numbers to find complete file contents.

---

## ⚠️ TROUBLESHOOTING

### Blank White Page
- Check browser console for errors
- Verify all imports are correct
- Ensure Supabase dependency is installed: `npm install @supabase/supabase-js`

### Chat Not Working
- Run SQL migration in Supabase
- Check environment variables in `.env.local`
- Verify realtime is enabled for `chat_messages` table

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Check all imports use `@/` prefix
- Verify TypeScript types are correct

---

## 📞 NEED HELP?

If you encounter issues:
1. Upload this restoration guide to Layout chat
2. Describe the specific error
3. Layout AI will help debug and fix

---

## ✅ PROJECT STATUS

**Total Lines of Code:** ~15,000+
**Total Files:** 30+ source files
**Features Implemented:**
- ✅ 90-day journey tracking
- ✅ Daily devotional readings (14 days in Nehemiah)
- ✅ Workout system (3 difficulty levels, 6 workout types)
- ✅ Habit tracking (8 default disciplines)
- ✅ Real-time Brotherhood chat (Supabase)
- ✅ Progress analytics with charts
- ✅ Vision/goal setting
- ✅ User profiles
- ✅ Responsive design
- ✅ Custom Cornerstone theme

**Tech Stack:**
- React 18.3
- TypeScript
- Vite
- Tailwind CSS
- ShadCN/UI components
- Supabase (PostgreSQL + Realtime)
- React Query
- React Router v7
- Recharts
- Lucide Icons

---

**Created:** 2024
**Project:** CORNERSTONE: 90
**Purpose:** 90-day spiritual transformation journey for men
**Theme:** Building on Christ, the Cornerstone

🏛️ Built on the Rock. Standing Firm. 💪
