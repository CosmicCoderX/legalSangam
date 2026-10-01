import { Link } from 'react-router-dom'
import { Search, MapPin, Briefcase, BadgeCheck, LocateFixed, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DashboardLayout } from '../../components/layout'
import { EmptyState, ErrorMessage, Loading } from '../../components/ui'
import { getAdvocates, legalSpecializations } from '../../services/advocateService'
import type { AdvocateProfile } from '../../types/models'

export const demos = [
  { id: 'ananya-verma', name: 'Advocate Ananya Verma', specialization: 'Criminal Law', experience: 5, city: 'Delhi', fee: '₹1,000' },
  { id: 'rohan-mehta', name: 'Advocate Rohan Mehta', specialization: 'Cyber Law', experience: 7, city: 'Noida', fee: '₹1,250' }
]

export default function Advocates() {
  const [items,setItems]=useState<AdvocateProfile[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[term,setTerm]=useState(''),[specialization,setSpecialization]=useState(''),[city,setCity]=useState(''),[consultation,setConsultation]=useState(''),[availability,setAvailability]=useState(''),[nearby,setNearby]=useState<{lat:number;lng:number}|null>(null),[locationError,setLocationError]=useState('')
  useEffect(()=>{getAdvocates().then(setItems).catch(()=>setError('Unable to load advocates. Please try again.')).finally(()=>setLoading(false))},[])
  const filtered=useMemo(()=>items.filter(a=>{const words=[a.name,a.title,a.primaryPracticeArea,a.tagline,a.bio,a.city,a.state,a.address,a.availability,...(a.specializations??a.specialization),...(a.languages??[])].filter(Boolean).join(' ').toLowerCase();const practice=a.specializations??a.specialization;return (!term||words.includes(term.toLowerCase()))&&(!specialization||practice.includes(specialization))&&(!city||a.city===city)&&(!consultation||(consultation==='online'?a.consultationOnline:a.consultationInPerson))&&(!availability||a.availability===availability)}).sort((a,b)=>nearby&&a.latitude&&a.longitude&&b.latitude&&b.longitude?Math.hypot(a.latitude-nearby.lat,a.longitude-nearby.lng)-Math.hypot(b.latitude-nearby.lat,b.longitude-nearby.lng):0),[items,term,specialization,city,consultation,availability,nearby])
  const locate=()=>{setLocationError('');navigator.geolocation?.getCurrentPosition(p=>setNearby({lat:p.coords.latitude,lng:p.coords.longitude}),()=>setLocationError('Location access was not granted. You can still search by city or state.'),{maximumAge:300000,timeout:8000})}
  return (
    <DashboardLayout role="client">
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-brand/10 bg-gradient-to-br from-white via-blue-50 to-brand/10 p-7 shadow-sm sm:p-9">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-brand/10 blur-3xl" />
        <p className="eyebrow">Verified connections</p><h1 className="mt-1 text-4xl font-bold text-ink tracking-tight">Find Advocates</h1>
        <p className="mt-3 text-lg text-slate-500 max-w-2xl">
          Search our network of verified legal professionals to find the right counsel for your needs.
        </p>
      </div>
      
      <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm md:grid-cols-3 transition-all focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand/40">
        <label className="relative md:col-span-2">
          <span className="sr-only">Search advocates</span>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input value={term} onChange={e=>setTerm(e.target.value)} className="w-full rounded-xl border-0 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-ink placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand" placeholder="Search name, law type, city, language..." />
        </label>
        <select value={specialization} onChange={e=>setSpecialization(e.target.value)} className="w-full rounded-xl border-0 bg-slate-50 py-3.5 px-4 text-sm text-ink font-medium focus:bg-white focus:ring-2 focus:ring-brand">
          <option value="">All specializations</option>{legalSpecializations.map(x=><option key={x}>{x}</option>)}
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-3"><select value={city} onChange={e=>setCity(e.target.value)} className="rounded-xl bg-white px-4 py-2 text-sm ring-1 ring-slate-200"><option value="">All locations</option>{['Delhi','Noida','Greater Noida','Ghaziabad','Gurugram'].map(location=><option key={location}>{location}</option>)}</select><select value={consultation} onChange={e=>setConsultation(e.target.value)} className="rounded-xl bg-white px-4 py-2 text-sm ring-1 ring-slate-200"><option value="">All consultation types</option><option value="online">Online consultation</option><option value="in-person">In-person consultation</option></select><select value={availability} onChange={e=>setAvailability(e.target.value)} className="rounded-xl bg-white px-4 py-2 text-sm ring-1 ring-slate-200"><option value="">All availability</option><option value="available-now">Available now</option><option value="available-today">Available today</option></select><button onClick={locate} className="btn-outline py-2"><LocateFixed size={16}/> Lawyers Near Me</button>{(term||specialization||city||consultation||availability||nearby)&&<button onClick={()=>{setTerm('');setSpecialization('');setCity('');setConsultation('');setAvailability('');setNearby(null)}} className="btn-outline py-2"><X size={16}/> Clear filters</button>}</div>{locationError&&<ErrorMessage>{locationError}</ErrorMessage>}
      
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {loading?<Loading/>:error?<ErrorMessage>{error}</ErrorMessage>:filtered.map(a => (
          <article className="card flex flex-col group hover:-translate-y-1 hover:border-brand/30 hover:shadow-brand/5" key={a.id}>
            <div className="flex gap-5">
              {(a.photoUrl || `/advocates/photos/advocate-${a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.webp`) ? (
                <img 
                  src={a.photoUrl || `/advocates/photos/advocate-${a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.webp`} 
                  alt={a.name} 
                  className="size-16 shrink-0 rounded-2xl object-cover shadow-sm border border-slate-100" 
                  onError={(e) => {
                    // Fallback to initials if image completely fails to load
                    (e.target as HTMLElement).style.display = 'none';
                    const fallback = (e.target as HTMLElement).nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'grid';
                  }}
                />
              ) : null}
              <div 
                className="size-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl font-bold text-brand shadow-sm"
                style={{ display: 'none' }}
              >
                {a.name.split(' ').slice(-2).map(x => x[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-bold text-ink text-lg group-hover:text-brand transition-colors">{a.name}</h2>
                  {a.rating && (
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs font-bold border border-amber-200">
                      ★ {a.rating}
                    </div>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-slate-400"/> {a.primaryPracticeArea} · {a.experienceYears??a.experience} yrs</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {a.address}</span>
                </div>
                <p className="mt-3 inline-block rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 border border-green-100">
                  ₹{a.consultationFee??a.fee} / session {a.verificationStatus==='verified'&&<BadgeCheck className="inline ml-1" size={14}/>} 
                </p>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-100">
              {a.isDemo && <p className="mb-3 text-xs font-medium text-slate-400">Demo profile · details shown are illustrative</p>}
              <Link className="btn-outline w-full py-2.5 group-hover:bg-brand group-hover:text-white group-hover:border-brand" to={`/dashboard/advocates/${a.id}`}>
                View Full Profile
              </Link>
            </div>
          </article>
        ))}{!loading&&!error&&!filtered.length&&<div className="md:col-span-2"><EmptyState title="No advocates match these filters.">Try changing your search or clearing filters.</EmptyState></div>}
      </div>
    </DashboardLayout>
  )
}
