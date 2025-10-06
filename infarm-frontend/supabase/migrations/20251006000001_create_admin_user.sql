-- Create admin user script
-- Run this in Supabase SQL Editor to create an admin user

-- First, create a user in auth.users (you need to do this through Supabase Auth UI or API)
-- Then update their role in the users table

-- Example: Update existing user to admin role
-- Replace 'user-email@example.com' with the actual email of the user you want to make admin
UPDATE users 
SET role = 'admin' 
WHERE email = 'user-email@example.com';

-- Or create a new admin user directly (if you have the user ID)
-- Replace 'user-id-here' with the actual user ID from auth.users
INSERT INTO users (id, username, email, password, role)
VALUES (
    'user-id-here',
    'admin',
    'admin@infarm.com',
    '',
    'admin'
) ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Add admin policies for better control
CREATE POLICY "Admins can manage all users" ON users FOR ALL
    TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all articles" ON articles FOR ALL
    TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all products" ON products FOR ALL
    TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all forum threads" ON forum_threads FOR ALL
    TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all forum replies" ON forum_replies FOR ALL
    TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
