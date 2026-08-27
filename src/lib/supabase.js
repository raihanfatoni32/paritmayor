import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Membuat koneksi client resmi ke database Supabase kamu
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
