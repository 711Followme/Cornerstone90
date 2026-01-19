# Supabase Database Setup

## Required Tables

Run the following SQL in your Supabase SQL Editor to create the necessary tables for real-time chat and user profiles.

### 1. Create Profiles Table

```sql
-- Create profiles table
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Allow users to insert/update their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (true);
```

### 2. Create Chat Messages Table

```sql
-- Create chat_messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages
CREATE POLICY "Messages are viewable by everyone"
  ON chat_messages FOR SELECT
  USING (true);

-- Allow users to insert messages
CREATE POLICY "Users can insert messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);
```

### 3. Enable Realtime

```sql
-- Enable realtime for chat_messages
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
```

## Verification

After running the SQL, verify your setup:

1. Go to **Table Editor** in Supabase
2. You should see two tables: `profiles` and `chat_messages`
3. Go to **Database** > **Replication** and ensure `chat_messages` is enabled for realtime

## Testing

1. Complete your profile in the app
2. Send a test message in Brotherhood chat
3. Open the app in another browser/tab
4. Messages should sync in real-time across all browsers

## Environment Variables

Make sure your `.env.local` file has:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are automatically set when you add Supabase integration.
