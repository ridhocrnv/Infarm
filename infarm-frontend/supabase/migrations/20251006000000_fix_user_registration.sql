-- Fix user registration by creating a database function
-- This function will be called automatically when a user signs up

-- First, let's update the users table to make password nullable
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;

-- Create a function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, username, password, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    '',
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger that calls the function when a new user is created in auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update RLS policies to be more permissive for the function
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Allow user profile creation" ON users FOR
INSERT
    TO authenticated WITH CHECK (true);

-- Also allow the function to insert (it runs as SECURITY DEFINER)
CREATE POLICY "Allow function to insert users" ON users FOR
INSERT
    TO anon WITH CHECK (true);
