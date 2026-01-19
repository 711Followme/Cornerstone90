# 🚀 Netlify Deployment Guide - CORNERSTONE: 90

Complete guide to deploy your app to Netlify.

---

## 📋 **PRE-DEPLOYMENT CHECKLIST**

Before deploying, ensure you have:

✅ **Supabase Setup Complete:**
- [ ] Supabase project created
- [ ] SQL migration run successfully
- [ ] Tables exist: `profiles` and `chat_messages`
- [ ] RLS policies created (permissive policies for testing)
- [ ] Supabase URL and Anon Key copied

✅ **Code Ready:**
- [ ] All files downloaded from Layout
- [ ] `src/config/supabase-config.ts` has your credentials
- [ ] Project builds locally (optional test)

---

## 🎯 **DEPLOYMENT OPTIONS**

### **Option A: Deploy from Local Files (Recommended)**

#### **Step 1: Download Project**
1. Download all project files from Layout
2. Extract to a folder (e.g., `cornerstone-90`)
3. Open terminal/command prompt in that folder

#### **Step 2: Verify Files**
Make sure you have these key files:
```
cornerstone-90/
├── src/
│   ├── config/
│   │   └── supabase-config.ts (with your credentials!)
│   ├── data/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── lib/
│   └── App.tsx
├── public/
├── package.json
├── netlify.toml
├── vite.config.ts
└── index.html
```

#### **Step 3: Install Dependencies**
```bash
npm install
```

#### **Step 4: Test Build Locally (Optional)**
```bash
npm run build
```
If successful, you'll see a `dist/` folder created.

#### **Step 5: Deploy to Netlify**

**Via Netlify CLI (Recommended):**
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

When prompted:
- **Create new site or link existing?** → Create new site
- **Team:** → Select your team
- **Site name:** → `cornerstone-90` (or your preferred name)
- **Publish directory:** → `dist`

**Via Netlify Web UI:**
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop your `dist` folder (after running `npm run build`)

---

### **Option B: Deploy from GitHub (Advanced)**

#### **Step 1: Push to GitHub**
```bash
# Initialize git (if not already)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - Cornerstone 90"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cornerstone-90.git
git branch -M main
git push -u origin main
```

#### **Step 2: Connect to Netlify**
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import from Git"**
3. Select **GitHub**
4. Choose your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

---

## 🔐 **ENVIRONMENT VARIABLES (IMPORTANT!)**

### **Option 1: Use Hard-Coded Credentials (Current Setup)**

Your `supabase-config.ts` already has the credentials hard-coded:
```typescript
export const supabaseConfig = {
  url: 'https://lddwvmqvhpoqbtskbnpc.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

✅ **This works fine for deployment!** No additional setup needed.

⚠️ **Security Note:** The anon key is safe to expose publicly - it's designed for client-side use.

---

### **Option 2: Use Environment Variables (More Secure)**

If you want to use environment variables instead:

#### **Step 1: Update supabase-config.ts**
```typescript
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://lddwvmqvhpoqbtskbnpc.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_anon_key_here'
};
```

#### **Step 2: Set Environment Variables in Netlify**
1. Go to your Netlify site dashboard
2. Click **"Site settings"** → **"Environment variables"**
3. Click **"Add a variable"**
4. Add these variables:
   - **Key:** `VITE_SUPABASE_URL`
   - **Value:** `https://lddwvmqvhpoqbtskbnpc.supabase.co`
   
   - **Key:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Your full anon key

5. Click **"Save"**
6. Redeploy your site

---

## 🧪 **POST-DEPLOYMENT TESTING**

After deployment, test these features:

### **1. Basic Access**
✅ Site loads at your Netlify URL
✅ Dashboard shows Day 1 content
✅ Navigation works (sidebar)

### **2. Profile**
✅ Can save profile (name + email)
✅ Profile appears in Supabase Table Editor
✅ No console errors

### **3. Brotherhood Chat**
✅ Can send messages
✅ Messages appear in chat
✅ Messages appear in Supabase Table Editor
✅ Real-time updates work (open two browser tabs)

### **4. Content Pages**
✅ Reading page loads
✅ Workout page loads
✅ Can navigate between days
✅ Can mark as complete

### **5. Progress Tracking**
✅ Progress page shows stats
✅ Disciplines page works
✅ Vision setup saves

---

## 🔧 **TROUBLESHOOTING**

### **Issue: Build Fails on Netlify**

**Error: "Module not found"**
```
Solution: Make sure all dependencies are in package.json
Run: npm install
Check: All imports use @/ prefix correctly
```

**Error: "Out of memory"**
```
Solution: Increase Node memory in netlify.toml:
[build.environment]
  NODE_OPTIONS = "--max_old_space_size=4096"
```

---

### **Issue: Site Loads but Routes Don't Work**

**Symptom:** Refreshing page shows 404 error

**Solution:** Make sure `netlify.toml` has redirects:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### **Issue: Supabase Connection Fails**

**Check Console Errors:**
- Open browser console (F12)
- Look for connection errors
- Verify credentials are correct

**Common Fixes:**
1. Verify `supabase-config.ts` has correct URL and key
2. Check Supabase project is active (not paused)
3. Verify RLS policies are permissive
4. Test connection directly in browser console:
```javascript
fetch('https://lddwvmqvhpoqbtskbnpc.supabase.co/rest/v1/profiles?select=count')
  .then(r => r.json())
  .then(console.log)
```

---

### **Issue: Environment Variables Not Working**

**If using Option 2 (env vars):**
1. Verify variables are set in Netlify dashboard
2. Variable names MUST start with `VITE_`
3. Redeploy after adding variables
4. Check build logs for confirmation

---

## 📊 **MONITORING YOUR DEPLOYMENT**

### **Netlify Dashboard:**
- **Analytics:** See visitor stats
- **Functions:** Monitor edge functions (if added later)
- **Forms:** Track form submissions
- **Deploy logs:** Debug build issues

### **Supabase Dashboard:**
- **Table Editor:** View data
- **Database → Logs:** See queries
- **Auth → Users:** Track users (if auth added)
- **Storage:** Monitor file uploads

---

## 🚀 **CUSTOM DOMAIN (Optional)**

### **Add Your Own Domain:**

1. **In Netlify Dashboard:**
   - Go to **"Domain settings"**
   - Click **"Add custom domain"**
   - Enter your domain (e.g., `cornerstone90.com`)

2. **Update DNS Records:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add these DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   ```

3. **Enable HTTPS:**
   - Netlify provides free SSL
   - Enable in **"Domain settings"** → **"HTTPS"**

---

## 📝 **DEPLOYMENT CHECKLIST**

Before going live:

**Technical:**
- [ ] Site builds successfully
- [ ] All routes work (no 404s)
- [ ] Supabase connection works
- [ ] Profile saves correctly
- [ ] Chat works
- [ ] Content loads properly

**Content:**
- [ ] All 14 days of readings loaded
- [ ] Workout system working
- [ ] Images load correctly
- [ ] No placeholder text

**Performance:**
- [ ] Site loads in < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive

**Testing:**
- [ ] Test on Chrome
- [ ] Test on Safari
- [ ] Test on Firefox
- [ ] Test on mobile device
- [ ] Test chat with 2+ users

---

## 🎯 **QUICK START SUMMARY**

**Fastest deployment path:**

1. Download all files from Layout
2. Verify `supabase-config.ts` has credentials
3. Install Netlify CLI: `npm install -g netlify-cli`
4. Login: `netlify login`
5. Deploy: `netlify deploy --prod`
6. Test your site!

**Your site will be live at:** `https://your-site-name.netlify.app`

---

## 💡 **NEXT STEPS AFTER DEPLOYMENT**

**Week 1:**
- [ ] Test all features thoroughly
- [ ] Fix any bugs found
- [ ] Monitor Supabase usage
- [ ] Share with beta users

**Week 2:**
- [ ] Add custom domain (optional)
- [ ] Setup analytics (optional)
- [ ] Create user documentation
- [ ] Plan content for Days 15-90

**Future Enhancements:**
- [ ] Add user authentication (Supabase Auth)
- [ ] Implement notifications
- [ ] Add progress export feature
- [ ] Create admin panel
- [ ] Build mobile app version

---

## 📞 **SUPPORT RESOURCES**

**Netlify:**
- Docs: https://docs.netlify.com
- Support: https://answers.netlify.com
- Status: https://netlifystatus.com

**Supabase:**
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- Status: https://status.supabase.com

**This Project:**
- Backup files: `PROJECT_BACKUP_COMPLETE.md`
- Restoration guide: `RESTORATION_GUIDE.md`
- Supabase setup: `SUPABASE_SETUP.md`

---

## ✅ **YOU'RE READY!**

Your CORNERSTONE: 90 app is ready to deploy to Netlify!

**Remember:**
1. Verify Supabase credentials are in `supabase-config.ts`
2. Test locally first (optional): `npm run build`
3. Deploy via CLI or drag-and-drop
4. Test all features after deployment
5. Monitor Supabase for data

**Let's build on the Rock! 🏛️💪**
