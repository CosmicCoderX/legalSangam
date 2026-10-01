import { categories, typeIcons, typeLabels, type LegalServiceType } from './mapUtils'

export function MapFilters({ selected, onChange }: { selected: 'all' | LegalServiceType; onChange: (category: 'all' | LegalServiceType) => void }) {
  return <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter legal services">
    {categories.map(category => <button key={category.id} onClick={() => onChange(category.id)} aria-pressed={selected === category.id}
      className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold transition ${selected === category.id ? 'bg-brand text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
      {category.id !== 'all' && <span aria-hidden="true" className="mr-1">{typeIcons[category.id]}</span>}{category.id === 'all' ? category.label : typeLabels[category.id]}
    </button>)}
  </div>
}
