import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { Navigation, Phone } from 'lucide-react'
import { formatDistance, typeIcons, typeLabels, type LegalPlace } from './mapUtils'

const markerIcon = (symbol: string, selected: boolean) => L.divIcon({ className: 'legal-map-icon', html: `<span class="${selected ? 'selected' : ''}">${symbol}</span>`, iconSize: [36, 36], iconAnchor: [18, 30], popupAnchor: [0, -32] })

export function MapMarker({ place, selected, onSelect }: { place: LegalPlace; selected: boolean; onSelect: () => void }) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`
  return <Marker position={[place.latitude, place.longitude]} icon={markerIcon(typeIcons[place.type], selected)} eventHandlers={{ click: onSelect }}>
    <Popup><div className="min-w-56 p-1"><p className="font-bold text-ink text-base">{place.name}</p><p className="mt-1 text-xs font-semibold text-blue-700">{typeLabels[place.type]} · {formatDistance(place.distance)}</p><p className="mt-2 text-xs text-slate-600">{place.address}</p>{place.phone && <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700"><Phone size={12} className="text-brand"/> {place.phone}</p>}<p className="mt-2 text-xs text-slate-500">{place.services.join(' · ')}</p><div className="mt-4 flex gap-3">{place.profileId && <Link className="text-xs font-bold text-blue-700 hover:text-brand" to={`/dashboard/advocates/${place.profileId}`}>View profile / consult</Link>}<a className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-brand" href={directions} target="_blank" rel="noreferrer"><Navigation size={12} /> Directions</a></div></div></Popup>
  </Marker>
}
