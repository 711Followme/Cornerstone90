# 📱 Eruda Mobile Debugging Guide

## 🎯 What is Eruda?

Eruda is a mobile-friendly developer console that gives you access to:
- **Console logs** - See all console.log, error, and warning messages
- **Network requests** - Monitor API calls to Supabase
- **DOM inspector** - Inspect HTML elements
- **Resources** - View localStorage, sessionStorage, cookies
- **Info** - Device and browser information

---

## 🚀 How to Use Eruda

### **Step 1: Open Your Site on Mobile**
Visit your Netlify URL on your mobile device

### **Step 2: Look for Eruda Button**
You'll see a small **gear icon** or **Eruda button** in the **bottom-right corner** of the screen

### **Step 3: Tap the Button**
This opens the Eruda console panel

### **Step 4: Navigate Tabs**
Swipe or tap between these tabs:
- **Console** - See logs and errors
- **Elements** - Inspect DOM
- **Network** - Monitor requests
- **Resources** - View storage
- **Info** - Device details
- **Snippets** - Run custom code
- **Sources** - View source files

---

## 🔍 **COMMON DEBUGGING TASKS**

### **Task 1: Check for Errors**

1. Open Eruda console
2. Go to **Console** tab
3. Look for red error messages
4. Tap on error to expand details

**What to look for:**
```
❌ "Cannot read property 'X' of undefined"
❌ "Network request failed"
❌ "Unexpected token"
❌ "[Calendar] Error calculating current day"
```

---

### **Task 2: Monitor Supabase Requests**

1. Open Eruda
2. Go to **Network** tab
3. Refresh page or trigger action (save profile, send message)
4. Look for requests to `lddwvmqvhpoqbtskbnpc.supabase.co`

**Check:**
- **Status Code:** Should be 200 or 201
- **Response:** Should have data
- **Errors:** Should be null

**Common issues:**
- Status 401: Authentication failed
- Status 403: RLS policy blocked request
- Status 500: Server error
- Failed: Network error or timeout

---

### **Task 3: Check localStorage**

1. Open Eruda
2. Go to **Resources** tab
3. Tap **localStorage**
4. Look for these keys:
   ```
   cornerstone_user_id
   cornerstone_progress
   cornerstone_workout_difficulty
   cornerstone_completion_day_X
   ```

**Verify:**
- User ID exists and looks like: `user_1234567890_abc123`
- Progress has correct structure
- Completion data is saving

---

### **Task 4: Test Date Calculation**

1. Open Eruda
2. Go to **Console** tab
3. Look for these logs:
   ```
   [Calendar] Today (CT): ...
   [Calendar] Program started: ...
   [Calendar] Days elapsed: ...
   [Calendar] Current day: ...
   ```

**Expected:**
- Days elapsed: Negative number (since Jan 5, 2026 hasn't arrived)
- Current day: Should be 1

**If errors:**
- Check for "[Calendar] Error" messages
- Note the specific error text

---

### **Task 5: Run Custom Code**

1. Open Eruda
2. Go to **Console** tab
3. Tap the input field at bottom
4. Type JavaScript and hit enter

**Useful commands:**

**Check Supabase connection:**
```javascript
fetch('https://lddwvmqvhpoqbtskbnpc.supabase.co/rest/v1/')
  .then(r => r.json())
  .then(d => console.log('Supabase:', d))
  .catch(e => console.error('Error:', e));
```

**Check current day:**
```javascript
console.log('Current day:', getCurrentDayFromCalendar());
```

**Check localStorage:**
```javascript
console.log('User ID:', localStorage.getItem('cornerstone_user_id'));
console.log('Progress:', localStorage.getItem('cornerstone_progress'));
```

**Clear all data:**
```javascript
localStorage.clear();
console.log('All data cleared - refresh page');
```

---

## 🐛 **DEBUGGING SCENARIOS**

### **Scenario 1: Blank Page**

**Steps:**
1. Open Eruda console
2. Check **Console** tab for errors
3. Check **Network** tab - did files load?
4. Check **Info** tab - browser version

**Common causes:**
- JavaScript error on load
- Build files not loading
- Incompatible browser

---

### **Scenario 2: Profile Not Saving**

**Steps:**
1. Go to Profile page
2. Open Eruda → **Network** tab
3. Enter name/email, click Save
4. Watch for POST request to Supabase
5. Check response status and data

**If request fails:**
- Status 401: Check Supabase anon key
- Status 403: RLS policy issue
- No request: JavaScript error (check Console)

---

### **Scenario 3: Chat Not Working**

**Steps:**
1. Go to Brotherhood page
2. Open Eruda → **Network** tab
3. Send a test message
4. Look for POST to `chat_messages`
5. Check **Console** for realtime subscription logs

**What to check:**
```javascript
// Should see in console:
"[chatService] Subscribing to chat messages..."
"[chatService] Subscription status: SUBSCRIBED"
"[chatService] New message received: ..."
```

---

### **Scenario 4: Date Shows Wrong Day**

**Steps:**
1. Open Eruda → **Console** tab
2. Refresh page
3. Look for `[Calendar]` logs
4. Check calculated values

**Expected logs:**
```
[Calendar] Today (CT): 2024-12-XX...
[Calendar] Program started: 2026-01-05...
[Calendar] Days elapsed: -XXX (negative = in future)
[Calendar] Current day: 1
```

**If wrong:**
- Check for calculation errors
- Verify timezone offset
- Test date math manually

---

## 📊 **ERUDA TABS EXPLAINED**

### **Console Tab**
- View console.log messages
- See errors and warnings
- Run JavaScript commands
- Filter by level (log, warn, error)

### **Elements Tab**
- Inspect HTML structure
- View CSS styles
- Modify DOM live
- Find elements causing layout issues

### **Network Tab**
- Monitor all HTTP requests
- View request/response details
- Check status codes
- Measure load times
- Debug API failures

### **Resources Tab**
- View localStorage
- View sessionStorage
- View cookies
- View IndexedDB
- Clear storage

### **Info Tab**
- Device information
- Browser details
- Screen dimensions
- User agent string
- Platform info

### **Snippets Tab**
- Save commonly used code
- Run saved scripts
- Quick testing

### **Sources Tab**
- View loaded JavaScript files
- View CSS files
- Browse file structure

---

## 💡 **PRO TIPS**

### **Tip 1: Keep Console Open**
Leave Eruda open while navigating the app to catch errors as they happen.

### **Tip 2: Filter Console Logs**
Use the filter buttons in Console tab:
- **All** - Show everything
- **Log** - Only console.log
- **Warn** - Only warnings
- **Error** - Only errors

### **Tip 3: Copy Console Output**
Long-press on a log entry to copy it for sharing.

### **Tip 4: Clear Console**
Tap the trash icon to clear old logs before testing.

### **Tip 5: Monitor Network**
Keep Network tab open when testing:
- Profile save
- Chat messages
- Page navigation
- Data loading

### **Tip 6: Take Screenshots**
Screenshot the console errors to share for debugging.

---

## 🚨 **COMMON ERROR MESSAGES**

### **Error: "Cannot read property 'X' of undefined"**
**Meaning:** Trying to access property of null/undefined object  
**Check:** Console tab for stack trace  
**Fix:** Add null checks in code  

### **Error: "Network request failed"**
**Meaning:** API call to Supabase failed  
**Check:** Network tab for status code  
**Fix:** Check Supabase connection, credentials, RLS policies  

### **Error: "Unexpected token"**
**Meaning:** JavaScript syntax error  
**Check:** Sources tab for file with error  
**Fix:** Build issue or transpilation problem  

### **Error: "localStorage is not defined"**
**Meaning:** Browser blocking localStorage  
**Check:** Info tab - private browsing mode?  
**Fix:** Disable private browsing  

---

## 🔄 **TESTING WORKFLOW**

### **Standard Testing Procedure:**

1. **Open app on mobile**
2. **Open Eruda console**
3. **Clear console** (trash icon)
4. **Perform action** (save profile, send message, etc.)
5. **Check Console tab** for errors
6. **Check Network tab** for failed requests
7. **Check Resources tab** for data changes
8. **Screenshot** any issues

---

## 📱 **DEVICE-SPECIFIC NOTES**

### **iOS Safari:**
- Eruda button may appear behind Safari UI
- Scroll to see it if hidden
- Works best in non-private browsing

### **Android Chrome:**
- Eruda works perfectly
- Button always visible
- Can use alongside Chrome DevTools

### **Samsung Internet:**
- Fully compatible
- May need to allow pop-ups

---

## 🎓 **ADVANCED USAGE**

### **Export Console Logs**

```javascript
// Copy all logs to clipboard
copy(console.logs);
```

### **Monitor Specific Functions**

```javascript
// Watch a specific function
eruda.monitor(myFunction);
```

### **Performance Monitoring**

```javascript
// Measure function execution time
console.time('myOperation');
// ... code here ...
console.timeEnd('myOperation');
```

### **Network Request Debugging**

```javascript
// Log all fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('Fetch:', args[0]);
  return originalFetch.apply(this, args);
};
```

---

## ✅ **VERIFICATION CHECKLIST**

After opening Eruda on mobile, verify:

- [ ] Eruda button visible (bottom-right)
- [ ] Console tab opens
- [ ] Can see logs
- [ ] Can see errors (if any)
- [ ] Network tab shows requests
- [ ] Resources tab shows localStorage
- [ ] Info tab shows device details
- [ ] Can run custom code in console

---

## 🆘 **IF ERUDA DOESN'T LOAD**

**Symptoms:** No Eruda button visible

**Possible causes:**
1. Script blocked by content blocker
2. Network issue loading CDN
3. JavaScript error before Eruda loads

**Solutions:**
1. Disable ad blockers
2. Try different network (WiFi vs cellular)
3. Hard refresh (force reload)
4. Check if `https://cdn.jsdelivr.net` is accessible

---

## 📞 **SHARING DEBUG INFO**

When reporting issues, share:

1. **Console logs:**
   - Screenshot of Console tab
   - Copy/paste error messages

2. **Network info:**
   - Screenshot of failed requests
   - Status codes
   - Response data

3. **Device info:**
   - Screenshot of Info tab
   - Browser name/version
   - OS version

4. **localStorage data:**
   - Screenshot of Resources → localStorage
   - User ID
   - Progress data

---

**Eruda is now active on your mobile site!** 🎉

Open your Netlify URL on mobile and look for the Eruda button in the bottom-right corner.

🏛️ Debug on the go, build on the Rock! 📱🔧
