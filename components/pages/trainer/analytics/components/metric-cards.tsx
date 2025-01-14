import { BarChart3, Users, IndianRupee } from 'lucide-react'
import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <UnifiedStatCard
        title="Monthly Growth"
        value="24%"
        trend="+24%"
        icon={BarChart3}
        className="bg-purple-600 text-white"
      />
      <UnifiedStatCard
        title="Active Users"
        value="1,234"
        icon={Users}
        className="bg-blue-600 text-white"
      />
      <UnifiedStatCard
        title="Revenue"
        value="₹45.2K"
        icon={IndianRupee}
        className="bg-emerald-600 text-white"
      />
    </div>
  )
}