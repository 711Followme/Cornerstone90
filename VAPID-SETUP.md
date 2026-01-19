# 🔑 VAPID Keys Setup for Push Notifications

This guide will help you generate and configure VAPID keys for push notifications in Cornerstone: 90.

## What are VAPID Keys?

**VAPID** (Voluntary Application Server Identification) keys are used to authenticate your push notifications. They ensure that only your server can send notifications to your users.

- **Public Key**: Safe to expose in your frontend code
- **Private Key**: Must be kept SECRET on your server

---

## 🚀 Quick Setup (Browser Method - EASIEST)

### Step 1: Generate Keys

1. **Open the key generator in your browser:**
   - Navigate to: `http://localhost:5173/generate-vapid-keys.html`
   - Or after deployment: `https://yourapp.com/generate-vapid-keys.html`

2. **Click "Generate VAPID Keys"**
   - The page will generate two keys instantly
   - Both keys will be displayed

3. **Copy the keys**
   - Click "Copy Public Key" button
   - Click "Copy Private Key" button

### Step 2: Add to .env File

1. Create a `.env` file in your project root (if you don't have one):
   ```bash
   touch .env
   ```

2. Add the keys to your `.env` file:
   ```env
   # VAPID Public Key (Frontend - Safe to expose)
   VITE_VAPID_PUBLIC_KEY=your_public_key_here

   # VAPID Private Key (Backend - KEEP SECRET!)
   VAPID_PRIVATE_KEY=your_private_key_here

   # Contact Email
   VAPID_CONTACT_EMAIL=admin@cornerstone90.com
   ```

3. **IMPORTANT:** Make sure `.env` is in your `.gitignore`:
   ```bash
   echo ".env" >> .gitignore
   ```

### Step 3: Restart Development Server

```bash
npm run dev
```

Your push notifications are now configured! ✅

---

## 🖥️ Alternative: Node.js Method

If you prefer command-line tools:

### Option A: Using the included script

```bash
node generateVapidKeys.js
```

Copy the output to your `.env` file.

### Option B: Using web-push library

```bash
# Install web-push globally
npm install -g web-push

# Generate keys
web-push generate-vapid-keys
```

---

## 📋 .env File Template

Copy this template to your `.env` file:

```env
# ===================================
# Cornerstone: 90 - Environment Variables
# ===================================

# VAPID Keys for Push Notifications
# Generate at: /generate-vapid-keys.html
VITE_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=

# Contact Information
VAPID_CONTACT_EMAIL=admin@cornerstone90.com

# App URL
VITE_APP_URL=https://cornerstone90.com
```

---

## ⚠️ Security Best Practices

### ✅ DO:
- ✅ Keep `VAPID_PRIVATE_KEY` in `.env` file
- ✅ Add `.env` to `.gitignore`
- ✅ Use environment variables in production
- ✅ Rotate keys if compromised
- ✅ Share public key in frontend code

### ❌ DON'T:
- ❌ Commit `.env` to version control
- ❌ Share private key in frontend code
- ❌ Expose private key in client-side JavaScript
- ❌ Hard-code keys in your source code
- ❌ Share private key in screenshots or documentation

---

## 🧪 Testing Push Notifications

Once your keys are configured:

1. **Navigate to Profile page** in your app
2. **Enable Push Notifications**
3. **Click "Test Reading" or "Test Workout"** buttons
4. You should receive a test notification!

---

## 🚀 Production Deployment

### For Vercel:
```bash
vercel env add VITE_VAPID_PUBLIC_KEY
vercel env add VAPID_PRIVATE_KEY
vercel env add VAPID_CONTACT_EMAIL
```

### For Netlify:
Go to: Site Settings → Environment Variables → Add:
- `VITE_VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_CONTACT_EMAIL`

### For Other Platforms:
Add the environment variables through your hosting provider's dashboard.

---

## 📅 Notification Schedule

Once configured, users will receive:

- 📖 **5:00 AM CT** - Daily Scripture reading reminder
- 💪 **6:00 PM CT** - Daily workout reminder

Notifications are checked every minute and sent once per day.

---

## 🔧 Troubleshooting

### Keys not working?
1. Make sure `.env` file is in project root
2. Restart your development server
3. Check browser console for errors
4. Verify keys are URL-safe base64 (no `+`, `/`, or `=`)

### Notifications not sending?
1. Check that user granted notification permission
2. Verify service worker is registered
3. Check browser console for errors
4. Test with the test buttons in Profile page

### Environment variables not loading?
1. Vite requires `VITE_` prefix for frontend variables
2. Make sure server is restarted after adding variables
3. Check that `.env` file is in the correct location

---

## 📚 Learn More

- [Web Push Protocol](https://web.dev/push-notifications/)
- [VAPID Specification](https://datatracker.ietf.org/doc/html/rfc8292)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

## ✅ Quick Checklist

- [ ] Generated VAPID keys
- [ ] Created `.env` file
- [ ] Added keys to `.env`
- [ ] Added `.env` to `.gitignore`
- [ ] Restarted development server
- [ ] Tested notifications in Profile page
- [ ] Configured production environment variables

---

**Need help?** Check the troubleshooting section above or review the notification service code in `src/services/notificationService.ts`.

**Built on Christ. Rebuilt in Him. Standing Firm.** 🏛️
