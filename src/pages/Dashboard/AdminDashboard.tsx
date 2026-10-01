import { DashboardLayout } from '../../components/layout'
import { EmptyState } from '../../components/ui'
import { supabase } from '../../lib/supabase'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    clients: '0',
    advocates: '0',
    verified: '0',
    consultations: '0'
  })

  useEffect(() => {
    const fetchStats = async () => {
      const [clientsRes, advRes, verifiedRes, consultRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'client'),
        supabase.from('advocates').select('id', { count: 'exact' }),
        supabase.from('advocates').select('id', { count: 'exact' }).eq('verification_status', 'verified'),
        supabase.from('bookings').select('id', { count: 'exact' })
      ])
      
      setStats({
        clients: (clientsRes.count || 0).toString(),
        advocates: (advRes.count || 0).toString(),
        verified: (verifiedRes.count || 0).toString(),
        consultations: (consultRes.count || 0).toString()
      })
    }
    fetchStats()
  }, [])

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <p className="text-sm font-medium tracking-wide text-brand uppercase">Admin Foundation</p>
        <h1 className="mt-2 text-4xl font-bold text-ink tracking-tight">System Administration</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="card text-center py-8">
          <p className="text-4xl font-black text-brand">{stats.clients}</p>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Total Clients</p>
        </div>
        <div className="card text-center py-8">
          <p className="text-4xl font-black text-ink">{stats.advocates}</p>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Total Advocates</p>
        </div>
        <div className="card text-center py-8">
          <p className="text-4xl font-black text-emerald-600">{stats.verified}</p>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Verified Advocates</p>
        </div>
        <div className="card text-center py-8">
          <p className="text-4xl font-black text-indigo-600">{stats.consultations}</p>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Total Consultations</p>
        </div>
      </div>
      
      <div className="mt-12">
        <EmptyState title="Administration tools are being prepared.">
          Secure administrative workflows and management dashboards will be enabled in Phase 2.
        </EmptyState>
      </div>
    </DashboardLayout>
  )
}
