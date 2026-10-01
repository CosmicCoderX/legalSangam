import { ArrowUpRight, MapPin, Star, Phone } from 'lucide-react'
import { formatDistance, typeIcons, typeLabels, type LegalPlace } from './mapUtils'

export function LocationCard({ place, active, onSelect }: { place: LegalPlace; active: boolean; onSelect: () => void }) {
  return <button id={`legal-place-${place.id}`} onClick={onSelect} className={`w-full rounded-xl border p-4 text-left transition ${active ? 'border-brand bg-blue-50 shadow-sm ring-1 ring-brand/20' : 'border-slate-200 bg-white hover:border-brand/40 hover:shadow-sm'}`}>
    <div className="flex gap-3"><span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">{typeIcons[place.type]}</span><div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-2"><h3 className="truncate text-sm font-bold text-ink">{place.name}</h3><ArrowUpRight size={16} className="shrink-0 text-brand" /></div>
      <p className="mt-1 text-xs font-semibold text-brand">{typeLabels[place.type]} · {formatDistance(place.distance)}</p>
      <p className="mt-2 flex gap-1 text-xs leading-5 text-slate-500"><MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" />{place.address}</p>
      {place.phone && <p className="mt-1 flex gap-1 text-xs leading-5 text-slate-600 font-medium"><Phone size={14} className="mt-0.5 shrink-0 text-brand" />{place.phone}</p>}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span className="truncate mr-2">{place.services.join(' · ')}</span>{place.rating && <span className="flex items-center shrink-0 gap-1 font-semibold text-amber-700"><Star size={13} fill="currentColor" /> {place.rating}</span>}</div>
    </div></div>
  </button>
}
