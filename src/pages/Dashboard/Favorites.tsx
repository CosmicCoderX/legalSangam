import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout";
import { EmptyState, Loading, ErrorMessage } from "../../components/ui";
import { Link } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";
import type { AdvocateProfile } from "../../types/models";
import { getAdvocates } from '../../services/advocateService';

export default function Favorites() {
  const [favorites, setFavorites] = useState<AdvocateProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favIds: string[] = JSON.parse(localStorage.getItem('fav_advocates') || '[]');
        
        if (favIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        const advocates = await getAdvocates();
        setFavorites(advocates.filter(advocate => favIds.includes(advocate.id)));
      } catch (err: any) {
        setError(err.message || "Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);

  return (
    <DashboardLayout role="client">
      <div className="mb-8">
        <p className="eyebrow">Your shortlist</p><h1 className="mt-1 text-3xl font-bold text-ink">Favorites</h1>
        <p className="mt-2 text-slate-500">Advocates you have saved for later.</p>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : favorites.length === 0 ? (
        <EmptyState title="No favorites yet">
          <p>You haven't saved any advocates to your favorites.</p>
          <Link className="btn-primary mt-6" to="/dashboard/advocates">
            Browse Advocates
          </Link>
        </EmptyState>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map(advocate => (
            <Link 
              key={advocate.id} 
              to={`/dashboard/advocates/${advocate.id}`}
              className="card p-0 flex flex-col group overflow-hidden hover:border-brand/30 hover:shadow-brand/5"
            >
              <div className="h-24 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={advocate.photoURL || `/advocates/photos/advocate-${advocate.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.webp`}
                  alt={advocate.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                    const fallback = (e.target as HTMLElement).nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 bg-brand/10 items-center justify-center font-bold text-3xl text-brand z-0"
                  style={{ display: 'none' }}
                >
                  {advocate.name[0]}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-ink line-clamp-1">{advocate.name}</h3>
                <p className="text-sm font-medium text-brand mt-1 line-clamp-1">
                  {(advocate.specializations || advocate.specialization || []).join(', ')}
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-500 font-medium">
                  <p className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> {advocate.city}, {advocate.state}</p>
                  <p className="flex items-center gap-2"><Briefcase size={16} className="text-slate-400" /> {advocate.experienceYears || advocate.experience} Years Exp.</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
