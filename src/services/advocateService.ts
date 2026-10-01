import { supabase } from '../lib/supabase'
import type { AdvocateProfile } from '../types/models'
import { demoAdvocateRecords, demoDetailsFor } from './advocateDemoData'
export const legalSpecializations=['Criminal Law','Civil Law','Family Law','Corporate Law','Cyber Law','Property Law','Consumer Law','Labour & Employment Law','Intellectual Property Law','Tax Law']
export const mapAdvocate = (x: any): AdvocateProfile => { const demo = demoDetailsFor(x.id); const specialization = x.specializations?.length && x.specializations[0] !== 'General Practice' ? x.specializations : demo.specialization; return { id: x.id, uid: x.id, name: x.name, title: x.title || 'Advocate', specialization, specializations: specialization, primaryPracticeArea: x.primary_practice_area || demo.primaryPracticeArea, experience: x.experience_years || demo.experience, experienceYears: x.experience_years || demo.experience, city: x.city && x.address ? x.city : demo.city, state: x.state && x.address ? x.state : demo.state, address: x.address || demo.address, fee: x.consultation_fee || demo.consultationFee, consultationFee: x.consultation_fee || demo.consultationFee, consultationOnline: x.consultation_online ?? demo.consultationOnline, consultationInPerson: x.consultation_in_person ?? demo.consultationInPerson, availability: x.availability_status ?? demo.availability, verificationStatus: x.verification_status, availableForConsultation: x.available_for_consultation, latitude: x.latitude ?? demo.latitude, longitude: x.longitude ?? demo.longitude, photoUrl: x.photo_url, courts: x.courts, rating: x.rating ?? demo.rating, reviews: x.reviews ?? demo.reviews, bio: x.bio || demo.bio, tagline: x.tagline || demo.tagline, enrollment: x.enrollment || demo.enrollment, languages: x.languages?.length ? x.languages : demo.languages, isDemo: true } }
function ensureSpecializationCoverage(advocates: AdvocateProfile[]) {
  const covered = new Set(advocates.flatMap(advocate => advocate.specializations ?? advocate.specialization))
  const supplemental = demoAdvocateRecords.filter(record => record.specializations.some(specialization => !covered.has(specialization)))
  supplemental.forEach(record => record.specializations.forEach(specialization => covered.add(specialization)))
  const supplemented = [...advocates, ...supplemental.map(mapAdvocate)]
  const metroCities = ['Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Gurugram']
  const cityCounts = new Map(metroCities.map(city => [city, supplemented.filter(advocate => advocate.city === city).length]))
  const citySupplements = demoAdvocateRecords.filter(record => {
    const city = mapAdvocate(record).city
    if (!metroCities.includes(city) || (cityCounts.get(city) ?? 0) >= 2 || supplemented.some(advocate => advocate.id === record.id)) return false
    cityCounts.set(city, (cityCounts.get(city) ?? 0) + 1)
    return true
  }).map(mapAdvocate)
  return [...supplemented, ...citySupplements]
}
export async function getAdvocates(){ const { data, error } = await supabase.from('advocates').select('*').eq('available_for_consultation',true); const records = !error && data?.length ? data : demoAdvocateRecords; return ensureSpecializationCoverage(records.map(mapAdvocate)) }
export async function getAdvocate(id:string){ const demo = demoAdvocateRecords.find(record => record.id === id); if (demo) return mapAdvocate(demo); const { data, error } = await supabase.from('advocates').select('*').eq('id',id).maybeSingle(); if(error) throw error; return data ? mapAdvocate(data) : null }
