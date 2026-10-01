import { Search } from 'lucide-react'

export function MapSearch({ value, onChange, loading }: { value: string; onChange: (value: string) => void; loading?: boolean }) {
  return <label className="relative block">
    <span className="sr-only">Search city, area, landmark or pincode</span><Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
    <input value={value} onChange={event => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-ink shadow-sm focus:border-brand" placeholder="Search city, area, landmark or pincode..." />
    {loading && <span className="absolute right-4 top-3.5 text-xs font-medium text-brand">Searching…</span>}
  </label>
}
