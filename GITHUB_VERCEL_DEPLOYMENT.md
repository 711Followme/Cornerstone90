# 🚀 GitHub + Vercel Deployment Guide

## 📋 **OVERVIEW**

This guide will walk you through:
1. Creating a GitHub repository
2. Adding your Cornerstone: 90 project to GitHub
3. Connecting GitHub to Vercel
4. Deploying your app on Vercel

**Time Required:** 15-20 minutes

---

## 📚 **PREREQUISITES**

Before starting, make sure you have:
- [ ] A GitHub account ([sign up free](https://github.com/signup))
- [ ] A Vercel account ([sign up free](https://vercel.com/signup))
- [ ] Your Cornerstone: 90 project files downloaded from Layout
- [ ] Git installed on your computer

### **Check if Git is installed:**

**On Windows:**
```bash
git --version
```

**On Mac:**
```bash
git --version
```

**If Git is NOT installed:**
- **Windows:** Download from [git-scm.com](https://git-scm.com/download/win)
- **Mac:** Run `xcode-select --install` in Terminal

---

## 🗂️ **STEP 1: PREPARE YOUR PROJECT FILES**

### **1.1 Download ALL Files from Layout**

Make sure you have these key files:
```
cornerstone-90/
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   ├── cornerstone-icon-192.png
│   ├── cornerstone-icon-512.png
│   └── robots.txt
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### **1.2 Create a `.gitignore` File**

Create a new file called `.gitignore` in your project root:

```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
dist/
build/
.output/
.vercel/

# Environment variables
.env
.env.local
.env.production.local
.env.development.local

# Editor directories
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Testing
coverage/

# Temporary files
*.tmp
.cache/
```

**Save this file as `.gitignore` in your project root folder.**

---

## 🐙 **STEP 2: CREATE GITHUB REPOSITORY**

### **2.1 Create New Repository on GitHub**

1. Go to [github.com](https://github.com)
2. Log in to your account
3. Click the **+** icon (top-right) → **New repository**

![GitHub New Repo](https://docs.github.com/assets/cb-11427/images/help/repository/repo-create.png)

### **2.2 Repository Settings**

Fill in the following:

**Repository name:** `cornerstone-90`

**Description:** (optional)
```
90-day men's discipleship journey. Daily Scripture readings, workouts, and brotherhood. Built on Christ. Rebuilt in Him.
```

**Visibility:**
- ✅ **Public** (recommended - free for public repos)
- ⬜ Private (requires paid plan for some features)

**Initialize repository:**
- ⬜ **DO NOT** check "Add a README file"
- ⬜ **DO NOT** check "Add .gitignore"
- ⬜ **DO NOT** choose a license yet

**Click:** **Create repository**

### **2.3 Copy the Repository URL**

After creating, you'll see setup instructions. Copy the **HTTPS URL**:

```
https://github.com/YOUR_USERNAME/cornerstone-90.git
```

**Keep this URL handy - you'll need it in Step 3.**

---

## 💻 **STEP 3: INITIALIZE GIT IN YOUR PROJECT**

### **3.1 Open Terminal/Command Prompt**

**On Windows:**
- Press `Win + R`
- Type `cmd` and press Enter
- Or use Git Bash (if installed)

**On Mac:**
- Press `Cmd + Space`
- Type `Terminal` and press Enter

### **3.2 Navigate to Your Project Folder**

```bash
cd path/to/your/cornerstone-90
```

**Example (Windows):**
```bash
cd C:\Users\YourName\Documents\cornerstone-90
```

**Example (Mac):**
```bash
cd ~/Documents/cornerstone-90
```

**Tip:** You can drag the folder into Terminal to auto-fill the path!

### **3.3 Verify You're in the Right Folder**

```bash
ls
```
or
```bash
dir
```

You should see your project files (package.json, src/, public/, etc.)

---

## 📤 **STEP 4: PUSH CODE TO GITHUB**

### **4.1 Initialize Git**

```bash
git init
```

**Expected output:**
```
Initialized empty Git repository in /path/to/cornerstone-90/.git/
```

### **4.2 Configure Git (First Time Only)**

If you haven't used Git before on this computer:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Use the same email associated with your GitHub account.**

### **4.3 Add All Files**

```bash
git add .
```

**This stages all your files for commit.**

### **4.4 Create First Commit**

```bash
git commit -m "Initial commit - Cornerstone: 90 project"
```

**Expected output:**
```
[main (root-commit) abc1234] Initial commit - Cornerstone: 90 project
 150 files changed, 15000 insertions(+)
 create mode 100644 package.json
 create mode 100644 src/App.tsx
 ...
```

### **4.5 Rename Branch to 'main' (if needed)**

GitHub uses `main` as default, but Git might use `master`:

```bash
git branch -M main
```

### **4.6 Add GitHub Remote**

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cornerstone-90.git
```

**Example:**
```bash
git remote add origin https://github.com/johnsmith/cornerstone-90.git
```

### **4.7 Verify Remote**

```bash
git remote -v
```

**Expected output:**
```
origin  https://github.com/YOUR_USERNAME/cornerstone-90.git (fetch)
origin  https://github.com/YOUR_USERNAME/cornerstone-90.git (push)
```

### **4.8 Push to GitHub**

```bash
git push -u origin main
```

**You'll be prompted to log in:**
- **Username:** Your GitHub username
- **Password:** Your GitHub Personal Access Token (NOT your password)

**If you don't have a token:** [Create one here](https://github.com/settings/tokens/new)
- Select scope: `repo` (full control of private repositories)
- Copy the token and save it somewhere safe

**Expected output:**
```
Enumerating objects: 200, done.
Counting objects: 100% (200/200), done.
Compressing objects: 100% (150/150), done.
Writing objects: 100% (200/200), 500 KiB | 5 MiB/s, done.
Total 200 (delta 50), reused 0 (delta 0)
To https://github.com/YOUR_USERNAME/cornerstone-90.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### **4.9 Verify on GitHub**

1. Go to `https://github.com/YOUR_USERNAME/cornerstone-90`
2. You should see all your files!
3. ✅ Success!

---

## 🚀 **STEP 5: DEPLOY TO VERCEL**

### **5.1 Sign Up / Log In to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (or **Log In**)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub

### **5.2 Import Project**

1. On Vercel dashboard, click **Add New...** → **Project**
2. Find your `cornerstone-90` repository
3. Click **Import**

![Vercel Import](https://assets.vercel.com/image/upload/v1645817520/docs-assets/static/docs/getting-started/import-project.png)

### **5.3 Configure Project**

**Framework Preset:** Vite ✅ (should auto-detect)

**Root Directory:** `./` (leave as default)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

### **5.4 Environment Variables**

If your app uses Supabase, add these:

Click **Environment Variables** → Add:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://lddwvmqvhpoqbtskbnpc.supabase.co
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZHd2bXF2aHBvcWJ0c2tibnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MzQ4NTUsImV4cCI6MjA4NDExMDg1NX0.RAyaPZojMtdLbD6MvA6ls7OAnXXDsBWEx0r8Dlh60Ww
```

### **5.5 Deploy**

Click **Deploy** button

**Vercel will:**
1. Clone your GitHub repo
2. Install dependencies (`npm install`)
3. Build your project (`npm run build`)
4. Deploy to their CDN

**This takes 1-3 minutes.**

### **5.6 Get Your URL**

Once deployed, you'll see:
```
🎉 Your project has been deployed!

https://cornerstone-90.vercel.app
```

**Click the URL to view your live site!**

---

## ✅ **STEP 6: VERIFY DEPLOYMENT**

### **6.1 Test on Desktop**

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Should see Cornerstone: 90 dashboard
3. Test navigation (Reading, Workout, Profile, etc.)

### **6.2 Test on Android**

1. Open your Vercel URL on Android Chrome
2. Should see dashboard (not blank page!)
3. Open Eruda console (bottom-right button)
4. Check for these logs:
   ```
   ✅ CORNERSTONE: 90 initialized - Version 1.0.2-android-fix
   📱 Android compatible build
   [PWA] Service Worker registered
   ```

### **6.3 Test PWA Install**

**On Android:**
1. Visit site in Chrome
2. Tap **⋮** (three dots menu)
3. Tap **Add to Home screen**
4. Confirm
5. App icon appears on home screen

**On iPhone:**
1. Visit site in Safari
2. Tap **Share** button
3. Tap **Add to Home Screen**
4. Confirm

---

## 🔄 **FUTURE UPDATES (Workflow)**

### **When You Make Changes in Layout:**

**Step 1: Download Updated Files**
Download the changed files from Layout

**Step 2: Replace Local Files**
Replace the files in your local project folder

**Step 3: Commit Changes**
```bash
git add .
git commit -m "Update: [describe what you changed]"
git push
```

**Step 4: Automatic Deployment**
Vercel automatically detects the GitHub push and redeploys!

**That's it!** No need to manually deploy each time.

---

## 🔧 **TROUBLESHOOTING**

### **Problem: Git Push Fails with "Authentication Failed"**

**Solution:** You need a Personal Access Token, not your GitHub password.

1. Go to: https://github.com/settings/tokens/new
2. Name: `Vercel Deploy Token`
3. Expiration: `90 days` (or longer)
4. Select scope: ✅ `repo`
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Use this as your password when pushing

### **Problem: Vercel Build Fails**

**Check the build logs:**
1. In Vercel dashboard → Your Project → Deployments
2. Click the failed deployment
3. View build logs
4. Look for the error

**Common issues:**
- Missing dependencies: Run `npm install` locally
- Build errors: Run `npm run build` locally to test
- Wrong Node version: Check `package.json` engines field

### **Problem: Site Deploys but Blank on Android**

**Solution:** Make sure you deployed the Android-fixed files:
- ✅ `public/service-worker.js` (fixed version)
- ✅ `src/main.tsx` (version 1.0.2-android-fix)
- ✅ `src/utils/debugDay.ts` (Android-compatible)

### **Problem: Environment Variables Not Working**

**Solution:**
1. Go to Vercel dashboard → Your Project → Settings → Environment Variables
2. Verify variables are set correctly
3. Click **Redeploy** to apply changes

---

## 📊 **VERCEL FEATURES**

### **Automatic Deployments**
- Every push to `main` branch → automatic deploy
- No manual deployment needed

### **Preview Deployments**
- Create a new branch: `git checkout -b feature-new-design`
- Push changes: `git push origin feature-new-design`
- Vercel creates a preview URL automatically
- Test before merging to main

### **Custom Domain**
- Go to Vercel dashboard → Your Project → Settings → Domains
- Add your custom domain
- Follow DNS instructions
- Free SSL certificate included

### **Analytics**
- Vercel dashboard → Your Project → Analytics
- See page views, performance, etc.

### **Logs**
- Vercel dashboard → Your Project → Logs
- See runtime logs, errors, etc.

---

## 🎯 **BEST PRACTICES**

### **Commit Messages**

Use clear, descriptive commit messages:

✅ **Good:**
```bash
git commit -m "Fix: Android date calculation issue"
git commit -m "Add: Week 3 reading content"
git commit -m "Update: Service worker for Android compatibility"
```

❌ **Bad:**
```bash
git commit -m "fix stuff"
git commit -m "update"
git commit -m "changes"
```

### **Branch Strategy**

For larger changes:

```bash
# Create feature branch
git checkout -b feature-week4-content

# Make changes, commit
git add .
git commit -m "Add: Week 4 reading content"

# Push to GitHub
git push origin feature-week4-content

# Create Pull Request on GitHub
# After review, merge to main
```

### **Regular Backups**

Your code is now backed up on GitHub! But also:
- Keep local copies of downloaded files
- Document any manual changes
- Export important data regularly

---

## 📋 **QUICK COMMAND REFERENCE**

### **First Time Setup**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cornerstone-90.git
git push -u origin main
```

### **Regular Updates**
```bash
git add .
git commit -m "Description of changes"
git push
```

### **Check Status**
```bash
git status                 # See what's changed
git log                    # See commit history
git remote -v              # See remote repositories
```

### **Undo Changes**
```bash
git checkout -- filename   # Discard changes to a file
git reset HEAD~1           # Undo last commit (keep changes)
git reset --hard HEAD~1    # Undo last commit (discard changes)
```

---

## 🔗 **USEFUL LINKS**

**Documentation:**
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub Guides](https://guides.github.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

**Tools:**
- [GitHub Desktop](https://desktop.github.com/) - GUI for Git
- [VS Code](https://code.visualstudio.com/) - Editor with built-in Git
- [Vercel CLI](https://vercel.com/docs/cli) - Deploy from terminal

---

## ✅ **FINAL CHECKLIST**

Before considering deployment complete:

**GitHub:**
- [ ] Repository created
- [ ] All files pushed to GitHub
- [ ] `.gitignore` file added
- [ ] Repository is public (or private if preferred)

**Vercel:**
- [ ] Project imported from GitHub
- [ ] Environment variables set (if using Supabase)
- [ ] Build successful
- [ ] Deployment successful
- [ ] Custom domain configured (optional)

**Testing:**
- [ ] Site loads on desktop
- [ ] Site loads on iPhone
- [ ] Site loads on Android (not blank!)
- [ ] PWA install works
- [ ] All pages accessible
- [ ] Supabase connection works (if applicable)

**Documentation:**
- [ ] README.md updated with deployment URL
- [ ] Environment variables documented
- [ ] Team members have access (if applicable)

---

## 🎉 **YOU'RE DONE!**

Your Cornerstone: 90 app is now:
- ✅ Version controlled on GitHub
- ✅ Automatically deployed on Vercel
- ✅ Accessible worldwide via HTTPS
- ✅ Android-compatible
- ✅ PWA-enabled

**Your Vercel URL:** `https://your-project.vercel.app`

**Share it with your brothers in the Men's Alliance!**

---

## 💬 **NEED HELP?**

**Common Commands Not Working?**
- Make sure you're in the correct directory (`cd` to your project folder)
- Check Git is installed (`git --version`)
- Verify GitHub credentials

**Deployment Issues?**
- Check Vercel build logs
- Verify environment variables
- Test build locally: `npm run build`

**Still stuck?**
- Share the error message
- Check Vercel documentation
- Ask in Layout community

---

🏛️ **Built on GitHub, deployed on Vercel, standing firm on the Rock!** 🚀

**Happy deploying!** 💪
