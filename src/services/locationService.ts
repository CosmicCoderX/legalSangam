import type { AdvocateProfile } from '../types/models'
import { calculateDistance, type Coordinates, type LegalPlace } from '../components/map/mapUtils'

const externalPlaces: LegalPlace[] = [
  { id: 'court-noida', type: 'court', name: 'District Court, Gautam Buddh Nagar', latitude: 28.535, longitude: 77.391, address: 'Surajpur, Greater Noida, Uttar Pradesh', services: ['Court registry', 'Hearings'] },
  { id: 'aid-noida', type: 'legal-aid', name: 'District Legal Services Authority', latitude: 28.5408, longitude: 77.389, address: 'Surajpur, Greater Noida, Uttar Pradesh', services: ['Free legal aid', 'Mediation'] },
  { id: 'police-noida', type: 'police-station', name: 'Surajpur Police Station', latitude: 28.526, longitude: 77.39, address: 'Surajpur, Greater Noida, Uttar Pradesh', services: ['Police assistance', 'FIR support'] },
  { id: 'firm-noida', type: 'law-firm', name: 'Noida Legal Chambers', latitude: 28.578, longitude: 77.33, address: 'Sector 62, Noida, Uttar Pradesh', rating: 4.5, services: ['Civil law', 'Corporate law'] }
]

export async function geocodeLocation(query: string): Promise<Coordinates | null> { const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query + ', India')}`, { headers: { Accept: 'application/json' } }); if (!response.ok) throw new Error('Geocoding failed'); const data = await response.json(); return data[0] ? { lat: Number(data[0].lat), lng: Number(data[0].lon) } : null }
export function getNearbyLegalPlaces(origin: Coordinates, advocates: AdvocateProfile[]) { const lawyers: LegalPlace[] = advocates.filter(a => a.latitude != null && a.longitude != null).map(a => ({ id: `lawyer-${a.id}`, type: 'lawyer', name: a.name, latitude: a.latitude!, longitude: a.longitude!, address: a.address ?? `${a.city}${a.state ? `, ${a.state}` : ''}`, phone: a.phone, rating: a.rating, services: a.specializations ?? a.specialization, profileId: a.id })); return [...lawyers, ...externalPlaces].map(place => ({ ...place, distance: calculateDistance(origin.lat, origin.lng, place.latitude, place.longitude) })).sort((a, b) => a.distance! - b.distance!) }
