
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log(process.env.VITE_SUPABASE_URL)

export const supabase = createClient(supabaseUrl, supabaseKey);