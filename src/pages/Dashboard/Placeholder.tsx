import { DashboardLayout } from '../../components/layout'
import { EmptyState } from '../../components/ui'
import type { Role } from '../../types/models'

export default function Placeholder({ role, title }: { role: Role; title: string }) {
  return (
    <DashboardLayout role={role}>
      <div className="mb-8">
        <p className="text-sm font-medium tracking-wide text-brand uppercase">{role} workspace</p>
        <h1 className="mt-2 text-4xl font-bold text-ink tracking-tight">{title}</h1>
      </div>
      
      <div className="mt-10">
        <EmptyState title={`${title} is being prepared.`}>
          This Phase 1 foundation is ready. The secure workflows for this feature will be enabled in Phase 2.
        </EmptyState>
      </div>
    </DashboardLayout>
  )
}
