import { Dumbbell, Star, Users, Users2 } from 'lucide-react'

import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"
import { TrainerTable } from "./components/trainer-table"

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6 lg:ml-64">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UnifiedStatCard
          title="Total Trainers"
          value="42"
          icon={Dumbbell}
          className="bg-blue-600 dark:bg-blue-700"
        />
        <UnifiedStatCard
          title="Active Trainers"
          value="35"
          icon={Users2}
          className="bg-green-600 dark:bg-green-700"
        />
        <UnifiedStatCard
          title="Avg Rating"
          value="4.8"
          icon={Star}
          className="bg-amber-600 dark:bg-amber-700"
        />
        <UnifiedStatCard
          title="Total Clients"
          value="856"
          icon={Users}
          className="bg-purple-600 dark:bg-purple-700"
        />
      </div>
      <TrainerTable />
    </div>
  )
}