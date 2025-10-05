import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please add the following to your .env.local file:');
  console.error('VITE_SUPABASE_URL=your_supabase_project_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  throw new Error('Missing Supabase environment variables. Check console for details.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
};

export type Article = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  author_id: string;
  created_at: string;
  author?: User;
};

export type Product = {
  id: string;
  product_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  seller_id: string;
  created_at: string;
  seller?: User;
};

export type ForumThread = {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  author?: User;
  reply_count?: number;
};

export type ForumReply = {
  id: string;
  content: string;
  thread_id: string;
  author_id: string;
  created_at: string;
  author?: User;
};
