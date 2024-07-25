
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('test')
console.log(process.env.SUPABASE_URL)

export const supabase = createClient(supabaseUrl, supabaseKey);