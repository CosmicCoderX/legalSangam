import { useAuth } from '../../contexts/AuthContext'
import { DashboardLayout } from '../../components/layout'
import { EmptyState } from '../../components/ui'
import { Link } from 'react-router-dom'
import { Gavel, Bot, FileText, Newspaper } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useState, useEffect } from 'react'

export default function ClientDashboard() {
  const { profile, user } = useAuth()
  
  const [stats, setStats] = useState({
    upcoming: '0',
    completed: '0',
    documents: '0'
  })

  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return
    const fetchStats = async () => {
      const [upcomingRes, completedRes, docsRes, recentRes] = await Promise.all([
        supabase.from('bookings').select('id', { count: 'exact' }).eq('client_id', user.id).eq('booking_status', 'confirmed'),
        supabase.from('bookings').select('id', { count: 'exact' }).eq('client_id', user.id).eq('booking_status', 'completed'),
        supabase.from('documents').select('id', { count: 'exact' }).eq('owner_id', user.id),
        supabase.from('bookings').select(`*, advocates(name, photo_url, specializations)`).eq('client_id', user.id).order('date', { ascending: false }).limit(4)
      ])
      setStats({
        upcoming: (upcomingRes.count || 0).toString(),
        completed: (completedRes.count || 0).toString(),
        documents: (docsRes.count || 0).toString()
      })
      setRecentBookings(recentRes.data || []);
    }
    fetchStats()
  }, [user])
  
  const quickActions = [
    { title: 'Find an Advocate', desc: 'Search for an advocate based on your legal needs.', path: '/dashboard/advocates', icon: Gavel, color: 'text-brand', bg: 'bg-brand/10' },
    { title: 'AskCounsel', desc: 'Get informational guidance about legal provisions and offences.', path: '/dashboard/askcounsel', icon: Bot, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Summarize Document', desc: 'Upload a legal document and generate an easy-to-understand summary.', path: '/dashboard/documents', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'View News', desc: 'Stay updated with legal and current affairs news.', path: '/dashboard/news', icon: Newspaper, color: 'text-amber-600', bg: 'bg-amber-50' }
  ]

  return (
    <DashboardLayout role="client">
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-ink to-brand p-7 text-white shadow-xl shadow-brand/10 sm:p-9">
        <div className="absolute -right-12 -top-16 size-52 rounded-full bg-white/10 blur-2xl" />
        <div>
          <p className="text-sm font-bold tracking-[.16em] text-blue-200 uppercase">Your legal workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {profile?.name ?? 'there'} 👋</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">Find trusted legal support, keep documents organised, and stay ready for every next step.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card group text-center py-8 bg-gradient-to-b from-white to-blue-50/50">
          <p className="text-4xl font-black text-brand">{stats.upcoming}</p>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Upcoming Consultations</p>
        </div>
        <div className="card group text-center py-8">
          <p className="text-4xl font-black text-ink">{stats.completed}</p>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Completed Consultations</p>
        </div>
        <div className="card group text-center py-8">
          <p className="text-4xl font-black text-ink">{stats.documents}</p>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Documents</p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-ink">Quick actions</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link className="card group hover:-translate-y-1 hover:border-brand/30 hover:shadow-brand/5" to={action.path} key={action.title}>
              <div className={`size-12 rounded-xl grid place-items-center mb-5 transition-colors ${action.bg} ${action.color} group-hover:bg-brand group-hover:text-white`}>
                <action.icon size={24} />
              </div>
              <h3 className="font-bold text-ink text-lg">{action.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">Recent activity</h2>
          <Link to="/dashboard/bookings" className="text-sm font-bold text-brand hover:underline">
            View All Bookings
          </Link>
        </div>
        <div className="mt-6">
          {recentBookings.length === 0 ? (
            <EmptyState title="No consultations yet.">
              <p>Find an advocate to book your first consultation.</p>
              <Link className="btn-primary mt-6" to="/dashboard/advocates">
                Find Advocates
              </Link>
            </EmptyState>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {recentBookings.map((b) => {
                const lawType = b.advocates?.specializations?.[0] || 'General Law';
                const statusMap: Record<string, { label: string, color: string }> = {
                  'pending': { label: 'Pending', color: 'bg-amber-100 text-amber-700 border border-amber-200' },
                  'confirmed': { label: 'In-progress', color: 'bg-blue-100 text-blue-700 border border-blue-200' },
                  'completed': { label: 'Completed', color: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
                  'cancelled': { label: 'Cancelled', color: 'bg-slate-100 text-slate-700 border border-slate-200' },
                };
                const statusData = statusMap[b.booking_status] || { label: b.booking_status, color: 'bg-slate-100 text-slate-600' };

                return (
                  <div key={b.id} className="card p-5 flex flex-col justify-between gap-4 hover:border-brand/30 hover:shadow-md transition-all sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-ink text-lg">{b.advocates?.name || 'Advocate'}</h3>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                          {lawType}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-500">{new Date(b.date).toLocaleDateString()} at {b.start_time}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusData.color} self-start sm:self-auto`}>
                      {statusData.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
