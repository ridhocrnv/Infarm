-- Fix user registration by simplifying the approach
-- Remove trigger-based approach and use manual insert with better error handling

-- First, let's update the users table to make password nullable and remove DEFAULT
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
ALTER TABLE users ALTER COLUMN id DROP DEFAULT;

-- Update RLS policies to allow user profile creation
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Allow user profile creation" ON users;
DROP POLICY IF EXISTS "Allow function to insert users" ON users;

-- Create a simple policy for user profile creation
CREATE POLICY "Users can create their own profile" ON users FOR
INSERT
    TO authenticated WITH CHECK (auth.uid() = id);

-- Also allow anon users to create profiles (for signup process)
CREATE POLICY "Allow signup profile creation" ON users FOR
INSERT
    TO anon WITH CHECK (true);
