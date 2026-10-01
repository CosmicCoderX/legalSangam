import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
const url=import.meta.env.VITE_SUPABASE_URL as string, key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string
if(!url||!key)throw new Error('Supabase environment variables are missing.')
export const supabase=createClient<Database>(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})
