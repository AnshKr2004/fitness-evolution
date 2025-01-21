"use client"

import { useEffect, useState } from 'react'
import { Dumbbell, Star, Users, Users2 } from 'lucide-react'

import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"
import { TrainerTable } from "./components/trainer-table"

interface TrainerStats {
  totalTrainers: number
  activeTrainers: number
  avgRating: number
  totalClients: number
}

export default function TrainersPage() {
  const [stats, setStats] = useState<TrainerStats>({
    totalTrainers: 0,
    activeTrainers: 0,
    avgRating: 0,
    totalClients: 0
  })

  useEffect(() => {
    fetchTrainerStats()
  }, [])

  const fetchTrainerStats = async () => {
    try {
      const response = await fetch('/api/trainers/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        console.error('Failed to fetch trainer stats')
      }
    } catch (error) {
      console.error('Error fetching trainer stats:', error)
    }
  }

  return (
    <div className="space-y-6 p-6 lg:ml-64">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UnifiedStatCard
          title="Total Trainers"
          value={stats.totalTrainers.toString()}
          icon={Dumbbell}
          className="bg-blue-600 dark:bg-blue-700"
        />
        <UnifiedStatCard
          title="Active Trainers"
          value={stats.activeTrainers.toString()}
          icon={Users2}
          className="bg-green-600 dark:bg-green-700"
        />
        <UnifiedStatCard
          title="Avg Rating"
          value={stats.avgRating.toFixed(1)}
          icon={Star}
          className="bg-amber-600 dark:bg-amber-700"
        />
        <UnifiedStatCard
          title="Total Clients"
          value={stats.totalClients.toString()}
          icon={Users}
          className="bg-purple-600 dark:bg-purple-700"
        />
      </div>
      <TrainerTable />
    </div>
  )
}