import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { MapMarker } from './MapMarker'
import { type Coordinates, type LegalPlace } from './mapUtils'

function Recenter({ center, selected }: { center: Coordinates; selected?: LegalPlace }) { const map = useMap(); useEffect(() => { const target = selected ? { lat: selected.latitude, lng: selected.longitude } : center; map.flyTo(target, selected ? 15 : 12, { duration: .5 }) }, [map, center, selected]); return null }
const userIcon = L.divIcon({ className: 'legal-user-icon', html: '<span></span>', iconSize: [22, 22], iconAnchor: [11, 11] })
export function LegalMap({ center, places, selectedId, onSelect, userLocation }: { center: Coordinates; places: LegalPlace[]; selectedId?: string; onSelect: (place: LegalPlace) => void; userLocation?: Coordinates | null }) {
  const selected = places.find(place => place.id === selectedId)
  return <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full" aria-label="Interactive map of nearby legal services"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Recenter center={center} selected={selected} />{userLocation && <Marker position={userLocation} icon={userIcon}><></></Marker>}{places.map(place => <MapMarker key={place.id} place={place} selected={selectedId === place.id} onSelect={() => onSelect(place)} />)}</MapContainer>
}
