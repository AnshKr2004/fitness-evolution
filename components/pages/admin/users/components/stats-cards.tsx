import { Users, UserCheck, UserPlus, UserX } from 'lucide-react'
import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"

export function StatsCards() {
  const stats = [
    {
      title: "Total Users",
      value: 2543,
      icon: Users,
      className: "bg-blue-600 dark:bg-blue-700",
    },
    {
      title: "Active Users",
      value: 1890,
      icon: UserCheck,
      className: "bg-green-600 dark:bg-green-700",
    },
    {
      title: "New Users (This Month)",
      value: 245,
      icon: UserPlus,
      className: "bg-amber-600 dark:bg-amber-700",
    },
    {
      title: "Inactive Users",
      value: 158,
      icon: UserX,
      className: "bg-purple-600 dark:bg-purple-700",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <UnifiedStatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}