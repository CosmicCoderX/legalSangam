export type LegalServiceType = 'lawyer' | 'legal-aid' | 'court' | 'police-station' | 'law-firm'

export type Coordinates = { lat: number; lng: number }

export type LegalPlace = {
  id: string
  type: LegalServiceType
  name: string
  latitude: number
  longitude: number
  address: string
  phone?: string
  rating?: number
  services: string[]
  profileId?: string
  distance?: number
}

export const categories: Array<{ id: 'all' | LegalServiceType; label: string }> = [
  { id: 'all', label: 'All' }, { id: 'lawyer', label: 'Lawyers' },
  { id: 'legal-aid', label: 'Legal Aid' }, { id: 'court', label: 'Courts' },
  { id: 'police-station', label: 'Police Stations' }, { id: 'law-firm', label: 'Law Firms' }
]

export const typeLabels: Record<LegalServiceType, string> = {
  lawyer: 'Lawyer', 'legal-aid': 'Legal aid', court: 'Court', 'police-station': 'Police station', 'law-firm': 'Law firm'
}

export const typeIcons: Record<LegalServiceType, string> = {
  lawyer: '⚖', 'legal-aid': '◈', court: '⌂', 'police-station': '♜', 'law-firm': '▦'
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const radians = (value: number) => value * Math.PI / 180
  const earthRadiusKm = 6371
  const dLat = radians(lat2 - lat1), dLon = radians(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dLon / 2) ** 2
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const formatDistance = (distance?: number) => distance == null ? 'Distance unavailable' : `${distance.toFixed(1)} km away`

export const defaultLocation: Coordinates = { lat: 28.5355, lng: 77.3910 }
