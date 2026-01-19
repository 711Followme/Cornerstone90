# 🏛️ CORNERSTONE: 90

A 90-day spiritual transformation journey for men, combining daily devotionals, workouts, and accountability.

## 📖 About

CORNERSTONE: 90 is a comprehensive program designed to help men build their lives on Christ, the Cornerstone. The program includes:

- **Daily Devotionals:** 14+ days of readings from Nehemiah (Rebuilding theme)
- **Workout System:** 6-day rotation with Sabbath rest, 3 difficulty levels
- **Habit Tracking:** Daily disciplines across spiritual, physical, mental, and relational domains
- **Progress Analytics:** Charts and stats to track your journey
- **Brotherhood Chat:** Real-time community support and accountability
- **Vision Setting:** Goal-setting framework to clarify your "why"

## 🚀 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI Components:** ShadCN/UI + Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router v7
- **Data:** React Query
- **Charts:** Recharts
- **Backend:** Supabase (PostgreSQL + Realtime)

## 📅 Calendar-Based Progression

The program runs on a fixed calendar starting **January 5, 2026 (Central Time)**. All users progress together based on the calendar date, creating a synchronized community experience.

- **Day 1:** January 5, 2026
- **Day 90:** April 4, 2026

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL migration from `SUPABASE_SETUP.md`
3. Add your credentials to `src/config/supabase-config.ts`:

```typescript
export const supabaseConfig = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
};
```

## 📦 Deployment

See `NETLIFY_DEPLOYMENT_GUIDE.md` for complete deployment instructions.

**Quick Deploy to Netlify:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 🗄️ Database Schema

### Tables

**profiles:**
- `id` (text) - User ID
- `name` (text) - User's full name
- `email` (text) - User's email
- `created_at` (timestamp) - Profile creation date
- `updated_at` (timestamp) - Last update date

**chat_messages:**
- `id` (uuid) - Message ID
- `user_id` (text) - Foreign key to profiles
- `message` (text) - Message content
- `created_at` (timestamp) - Message timestamp

## 🎯 Features

### ✅ Implemented
- [x] Calendar-based day progression
- [x] 14 days of Nehemiah devotionals
- [x] 6-day workout rotation with 3 difficulty levels
- [x] Daily disciplines tracking
- [x] Progress analytics with charts
- [x] Real-time Brotherhood chat
- [x] User profiles
- [x] Vision/goal setting
- [x] Day navigation (view past content)
- [x] Completion tracking per day
- [x] Responsive design
- [x] Custom Cornerstone theme

### 🔮 Future Enhancements
- [ ] Complete all 90 days of devotionals
- [ ] User authentication (Supabase Auth)
- [ ] Push notifications
- [ ] Weekly recap emails
- [ ] Progress export (PDF/CSV)
- [ ] Admin dashboard
- [ ] Mobile app (React Native)
- [ ] Group challenges
- [ ] Milestone badges

## 📚 Documentation

- **RESTORATION_GUIDE.md** - Complete restoration instructions
- **NETLIFY_DEPLOYMENT_GUIDE.md** - Deployment guide
- **SUPABASE_SETUP.md** - Database setup SQL
- **SUPABASE_DIAGNOSTIC.md** - Troubleshooting database issues
- **CALENDAR-BASED-PROGRESSION.md** - Day progression system details
- **PROJECT_BACKUP_COMPLETE.md** - Full project backup

## 🤝 Contributing

This is a personal/ministry project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for ministry use. Contact for licensing details.

## 💪 Built on the Rock

*"Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock." - Matthew 7:24*

---

**Created with Layout.dev**  
**Deployed on Netlify**  
**Powered by Supabase**

🏛️ Building on Christ, the Cornerstone
