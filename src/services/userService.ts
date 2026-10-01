import { supabase } from '../lib/supabase'; import type { Role,UserProfile } from '../types/models'
export async function createUserProfile(profile:Omit<UserProfile,'createdAt'|'updatedAt'>){
    const{error}=await supabase.from('profiles').insert({id:profile.uid,name:profile.name,email:profile.email,role:profile.role,phone:profile.phone??null});
    if(error)throw error;
    if(profile.role === 'advocate') {
        const {error: advError} = await supabase.from('advocates').insert({id:profile.uid,name:profile.name,city:'',state:''});
        if(advError)throw advError;
    }
}
export async function getUserProfile(uid:string){const{data,error}=await supabase.from('profiles').select('*').eq('id',uid).maybeSingle();if(error)throw error;return data?{uid:(data as any).id,name:(data as any).name,email:(data as any).email,role:(data as any).role,phone:(data as any).phone??undefined,photo_url:(data as any).photo_url??undefined} as UserProfile:null}
export const dashboardFor=(role:Role)=>role==='advocate'?'/advocate/dashboard':role==='admin'?'/admin/dashboard':'/dashboard'
