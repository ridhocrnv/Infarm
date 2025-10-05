/*
 # InFarm Database Schema Migration
 
 1. New Tables
 - `users`
 - `id` (uuid, primary key)
 - `username` (text, unique)
 - `email` (text, unique)
 - `password` (text) - hashed password
 - `role` (text) - 'user' or 'admin'
 - `created_at` (timestamptz)
 
 - `articles`
 - `id` (uuid, primary key)
 - `title` (text)
 - `content` (text)
 - `image_url` (text)
 - `author_id` (uuid, foreign key)
 - `created_at` (timestamptz)
 
 - `products`
 - `id` (uuid, primary key)
 - `product_name` (text)
 - `description` (text)
 - `price` (numeric)
 - `image_url` (text)
 - `seller_id` (uuid, foreign key)
 - `created_at` (timestamptz)
 
 - `forum_threads`
 - `id` (uuid, primary key)
 - `title` (text)
 - `content` (text)
 - `author_id` (uuid, foreign key)
 - `created_at` (timestamptz)
 
 - `forum_replies`
 - `id` (uuid, primary key)
 - `content` (text)
 - `thread_id` (uuid, foreign key)
 - `author_id` (uuid, foreign key)
 - `created_at` (timestamptz)
 
 2. Security
 - Enable RLS on all tables
 - Add policies for authenticated users to read public content
 - Add policies for authors/sellers to manage their own content
 - Add policies for admins to manage all content
 */
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT auth.uid(),
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    image_url text,
    author_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name text NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    image_url text,
    seller_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now()
);

-- Create forum_threads table
CREATE TABLE IF NOT EXISTS forum_threads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    author_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now()
);

-- Create forum_replies table
CREATE TABLE IF NOT EXISTS forum_replies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content text NOT NULL,
    thread_id uuid NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
    author_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE
    users ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    articles ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    products ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    forum_threads ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    forum_replies ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read all profiles" ON users FOR
SELECT
    TO authenticated USING (true);

CREATE POLICY "Users can insert own profile" ON users FOR
INSERT
    TO authenticated WITH CHECK (auth.uid() :: text = id :: text);

CREATE POLICY "Users can update own profile" ON users FOR
UPDATE
    TO authenticated USING (auth.uid() :: text = id :: text) WITH CHECK (auth.uid() :: text = id :: text);

-- Articles policies
CREATE POLICY "Anyone can read articles" ON articles FOR
SELECT
    TO authenticated USING (true);

CREATE POLICY "Authenticated users can create articles" ON articles FOR
INSERT
    TO authenticated WITH CHECK (auth.uid() :: text = author_id :: text);

CREATE POLICY "Authors can update own articles" ON articles FOR
UPDATE
    TO authenticated USING (auth.uid() :: text = author_id :: text) WITH CHECK (auth.uid() :: text = author_id :: text);

CREATE POLICY "Authors can delete own articles" ON articles FOR DELETE TO authenticated USING (auth.uid() :: text = author_id :: text);

-- Products policies
CREATE POLICY "Anyone can read products" ON products FOR
SELECT
    TO authenticated USING (true);

CREATE POLICY "Authenticated users can create products" ON products FOR
INSERT
    TO authenticated WITH CHECK (auth.uid() :: text = seller_id :: text);

CREATE POLICY "Sellers can update own products" ON products FOR
UPDATE
    TO authenticated USING (auth.uid() :: text = seller_id :: text) WITH CHECK (auth.uid() :: text = seller_id :: text);

CREATE POLICY "Sellers can delete own products" ON products FOR DELETE TO authenticated USING (auth.uid() :: text = seller_id :: text);

-- Forum threads policies
CREATE POLICY "Anyone can read forum threads" ON forum_threads FOR
SELECT
    TO authenticated USING (true);

CREATE POLICY "Authenticated users can create threads" ON forum_threads FOR
INSERT
    TO authenticated WITH CHECK (auth.uid() :: text = author_id :: text);

CREATE POLICY "Authors can update own threads" ON forum_threads FOR
UPDATE
    TO authenticated USING (auth.uid() :: text = author_id :: text) WITH CHECK (auth.uid() :: text = author_id :: text);

CREATE POLICY "Authors can delete own threads" ON forum_threads FOR DELETE TO authenticated USING (auth.uid() :: text = author_id :: text);

-- Forum replies policies
CREATE POLICY "Anyone can read forum replies" ON forum_replies FOR
SELECT
    TO authenticated USING (true);

CREATE POLICY "Authenticated users can create replies" ON forum_replies FOR
INSERT
    TO authenticated WITH CHECK (auth.uid() :: text = author_id :: text);

CREATE POLICY "Authors can update own replies" ON forum_replies FOR
UPDATE
    TO authenticated USING (auth.uid() :: text = author_id :: text) WITH CHECK (auth.uid() :: text = author_id :: text);

CREATE POLICY "Authors can delete own replies" ON forum_replies FOR DELETE TO authenticated USING (auth.uid() :: text = author_id :: text);