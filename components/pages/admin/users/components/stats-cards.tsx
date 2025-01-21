"use client"

import { useEffect, useState } from 'react'
import { Users, UserCheck, UserPlus, UserX } from 'lucide-react'
import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"

interface UserStats {
  totalUsers: number
  activeUsers: number
  newUsers: number
  inactiveUsers: number
}

export function StatsCards() {
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    inactiveUsers: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/users/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching user stats:', error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      className: "bg-blue-600 dark:bg-blue-700",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      className: "bg-green-600 dark:bg-green-700",
    },
    {
      title: "New Users (This Month)",
      value: stats.newUsers,
      icon: UserPlus,
      className: "bg-amber-600 dark:bg-amber-700",
    },
    {
      title: "Inactive Users",
      value: stats.inactiveUsers,
      icon: UserX,
      className: "bg-purple-600 dark:bg-purple-700",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <UnifiedStatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}