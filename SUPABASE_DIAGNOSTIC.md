# SUPABASE DIAGNOSTIC & FIX

Run these queries in your Supabase SQL Editor to diagnose and fix issues.

## 1️⃣ Check if tables exist
```sql
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'chat_messages');
```
**Expected:** You should see both `profiles` and `chat_messages`

---

## 2️⃣ Check RLS status
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'chat_messages');
```
**Expected:** Both should have `rowsecurity = true`

---

## 3️⃣ Check existing policies
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('profiles', 'chat_messages');
```
**Expected:** You should see policies for INSERT, SELECT, UPDATE

---

## 4️⃣ FIX: Drop and recreate RLS policies (MORE PERMISSIVE)

If you're getting "signal aborted" or RLS errors, run this:

```sql
-- DROP existing policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Messages are viewable by everyone" ON chat_messages;
DROP POLICY IF EXISTS "Users can insert messages" ON chat_messages;

-- DISABLE RLS temporarily for testing
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages DISABLE ROW LEVEL SECURITY;

-- Test if this fixes the issue. If it does, we know RLS was the problem.
-- You can re-enable with proper policies after testing.
```

---

## 5️⃣ After testing WITHOUT RLS, re-enable with PERMISSIVE policies

Once you confirm it works without RLS, run this to re-enable with open policies:

```sql
-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create VERY permissive policies (for development/testing)
CREATE POLICY "allow_all_profiles" ON profiles
  FOR ALL 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "allow_all_messages" ON chat_messages
  FOR ALL 
  USING (true)
  WITH CHECK (true);
```

---

## 6️⃣ Verify policies were created
```sql
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('profiles', 'chat_messages');
```

---

## 7️⃣ Test insert directly in SQL
```sql
-- Try inserting a test profile
INSERT INTO profiles (id, name, email, created_at, updated_at)
VALUES ('test_user_123', 'Test User', 'test@example.com', NOW(), NOW());

-- Check if it was inserted
SELECT * FROM profiles WHERE id = 'test_user_123';

-- Delete test data
DELETE FROM profiles WHERE id = 'test_user_123';
```

---

## 🔍 TROUBLESHOOTING STEPS:

### Step 1: Run query #1 to verify tables exist
If tables don't exist → Re-run the original SQL migration

### Step 2: Run query #4 to DISABLE RLS temporarily
This will tell us if RLS is causing the issue

### Step 3: Try saving profile in your app
If it works now → RLS was the problem

### Step 4: Run query #5 to re-enable RLS with permissive policies
This makes RLS less restrictive for testing

### Step 5: Try saving profile again
Should work now with proper policies

---

## ⚠️ IMPORTANT NOTES:

**The "signal aborted" error is usually caused by:**
1. ❌ RLS blocking the request (most common)
2. ❌ Wrong table name or schema
3. ❌ Network timeout (rare)
4. ❌ CORS issue (rare with Supabase)

**Our fix disables RLS temporarily for testing, then re-enables with very permissive policies.**

For production, you'd want more restrictive policies, but for development/testing, permissive policies are fine.

---

## 🎯 QUICK FIX (Copy/Paste This)

If you just want to fix it quickly, copy and paste this entire block:

```sql
-- Quick fix: Disable RLS and recreate with permissive policies
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Messages are viewable by everyone" ON chat_messages;
DROP POLICY IF EXISTS "Users can insert messages" ON chat_messages;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);

-- Verify
SELECT tablename, policyname FROM pg_policies WHERE tablename IN ('profiles', 'chat_messages');
```

**Run this in Supabase SQL Editor, then try saving your profile again!**
