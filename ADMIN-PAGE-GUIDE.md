# 🛡️ Admin Page - Complete Guide

## 🔐 Access Information

**Password:** `Mens@pp154`

**URL:** `https://cornerstone90.netlify.app/admin`

**Session Duration:** 24 hours (auto-logout after 24 hours)

---

## ✅ What's Included

### 1. **Password Protection**
- Secure login screen
- Password visibility toggle
- Session management (24-hour timeout)
- Logout button

### 2. **Code Editor Tab**
- Select files from dropdown menu
- Edit code directly in browser
- Save changes (simulated - logs to console)
- Download individual files
- Monospace font for better code readability

**Available Files:**
- All pages (Index, DailyReading, Workout, Profile, Admin, etc.)
- Data files (nehemiahReadings, journeyData, disciplinesData, workoutData)
- Components (NotificationSettings, App.tsx)
- Config files (tailwind.config.js, index.css)

### 3. **File Manager Tab**
- Browse project structure
- Visual file tree
- Download all code as ZIP (simulated)
- Project documentation

### 4. **Upload Tab**
- **Upload Code Files:** TSX, TS, JS, JSX, CSS, JSON
- **Upload Images:** PNG, JPG, SVG, WEBP
- Drag & drop zones
- File preview and confirmation

### 5. **Content Generator Tab**
- Moved from user dashboard
- Full access to content generation tools
- Create readings, workouts, etc.
- Now only accessible to admins

---

## 🎯 Features

### Security Features:
- ✅ Password-protected access
- ✅ Session timeout (24 hours)
- ✅ Password visibility toggle
- ✅ Logout functionality
- ✅ Auth state persists across page refreshes

### Code Editing Features:
- ✅ File selector with organized categories
- ✅ Live code editing
- ✅ Save changes (console logging)
- ✅ Download files individually
- ✅ Monospace editor for readability

### File Management Features:
- ✅ Project structure browser
- ✅ Download all code
- ✅ Clear file organization
- ✅ Documentation notes

### Upload Features:
- ✅ Code file uploads
- ✅ Image file uploads
- ✅ File type validation
- ✅ Upload confirmation
- ✅ Visual drag & drop zones

---

## 📱 How to Access

### From Sidebar:
1. Look for **"Restricted Access"** section in sidebar
2. Click **"Admin"** (Shield icon)
3. Enter password: `Mens@pp154`
4. Access granted for 24 hours

### Direct URL:
```
https://cornerstone90.netlify.app/admin
```

---

## 🔧 How to Use

### Editing Code:
1. Go to **Code Editor** tab
2. Select file from dropdown
3. Edit content in text area
4. Click **"Save Changes"** (logs to console)
5. Or click **"Download File"** to save locally

### Uploading Files:
1. Go to **Upload** tab
2. Click on code or image upload zone
3. Select file from computer
4. File loads into system
5. Confirmation toast appears

### Managing Files:
1. Go to **File Manager** tab
2. Browse project structure
3. Click **"Download All Code"** for full backup

### Content Generation:
1. Go to **Content Gen** tab
2. Use full content generator
3. Create readings, workouts, etc.

---

## 🚨 Important Notes

### Production Implementation:
This is a **demonstration UI**. For full functionality:

1. **Backend API Required:**
   - File read/write operations
   - Database connections
   - Authentication server
   - File storage system

2. **Current Implementation:**
   - Simulates file editing
   - Logs to console
   - Demonstrates UI/UX
   - Uploads load into memory

3. **To Make Fully Functional:**
   - Add backend server (Node.js/Express)
   - Connect to file system API
   - Implement real authentication
   - Add database for user sessions

### Security Considerations:
- ⚠️ Password is hardcoded (use environment variables in production)
- ⚠️ No rate limiting (add in production)
- ⚠️ No audit logging (add in production)
- ⚠️ Session stored in localStorage (use HTTP-only cookies in production)

---

## 🎨 UI Features

### Login Screen:
- Centered modal design
- Shield icon
- Password field with show/hide toggle
- Cornerstone branding and colors
- Enter key support

### Admin Dashboard:
- Sticky header with logout button
- Tabbed interface for different tools
- Cornerstone color scheme
- Responsive design
- Clean, professional layout

### Components:
- **AdminCodeEditor** - Code editing interface
- **AdminFileManager** - File browser
- **AdminUpload** - File upload handlers
- **ContentGenerator** - Content creation tools

---

## 📂 File Structure

```
src/
├── pages/
│   └── Admin.tsx              (Main admin page with auth)
├── components/
│   ├── AdminCodeEditor.tsx    (Code editor component)
│   ├── AdminFileManager.tsx   (File browser component)
│   └── AdminUpload.tsx        (Upload handlers component)
```

**Route:** `/admin`

---

## 🔑 Password Management

### Current Password:
```
Mens@pp154
```

### To Change Password:
Edit `src/pages/Admin.tsx`:
```typescript
const ADMIN_PASSWORD = 'Your_New_Password_Here';
```

**Recommendation:** Use environment variables:
```typescript
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
```

---

## ✅ Testing Checklist

- [ ] Access admin page from sidebar
- [ ] Enter password and login
- [ ] Verify session persists on refresh
- [ ] Test all 4 tabs (Editor, Files, Upload, Content)
- [ ] Select and edit a file
- [ ] Download a file
- [ ] Upload code file
- [ ] Upload image file
- [ ] Use content generator
- [ ] Logout and verify redirect
- [ ] Try accessing without password

---

## 🚀 Future Enhancements

### Planned Features:
1. **Real File System Integration**
   - Actual file reading/writing
   - Git integration
   - Version control

2. **Enhanced Authentication**
   - User roles (admin, editor, viewer)
   - Multi-user support
   - OAuth integration

3. **Advanced Code Editor**
   - Syntax highlighting
   - Auto-completion
   - Error detection
   - Live preview

4. **File Management**
   - Create new files
   - Delete files
   - Rename files
   - Move files

5. **Backup & Restore**
   - Automatic backups
   - Restore from backup
   - Export/import settings

---

## 📞 Support

**Questions about Admin page?**
- Check console logs for debugging
- Verify password is correct
- Ensure session hasn't expired
- Try logout and login again

**Need to reset session?**
```javascript
// In browser console:
localStorage.removeItem('cornerstone90_admin_auth');
```

---

## ✅ Summary

✅ **Password:** `Mens@pp154`  
✅ **Access:** 24-hour sessions  
✅ **Features:** Code editor, file manager, uploads, content gen  
✅ **Security:** Password-protected, session management  
✅ **Location:** Sidebar → Restricted Access → Admin  

**Admin page successfully cleans up user dashboard by moving Content Generator to admin-only area!** 🛡️
