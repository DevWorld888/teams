
import { supabaseAnonkey,supabaseURL } from '@/config'
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(supabaseURL,supabaseAnonkey)