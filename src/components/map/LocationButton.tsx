import { LocateFixed, LoaderCircle } from 'lucide-react'
export function LocationButton({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return <button onClick={onClick} disabled={loading} className="btn-outline w-full py-2.5 text-sm disabled:cursor-wait disabled:opacity-70" aria-label="Use my current location">
    {loading ? <LoaderCircle size={17} className="animate-spin" /> : <LocateFixed size={17} />} Use My Location
  </button>
}
