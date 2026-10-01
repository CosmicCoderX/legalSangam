import { supabase } from '../lib/supabase'
export const register=(email:string,password:string,metadata:Record<string,string>)=>supabase.auth.signUp({email,password,options:{data:metadata}})
export const login=(email:string,password:string)=>supabase.auth.signInWithPassword({email,password})
export const logout=()=>supabase.auth.signOut()
