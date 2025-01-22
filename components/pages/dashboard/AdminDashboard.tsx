"use client"
import { Users, Dumbbell, Calendar, MessageSquare } from 'lucide-react'
import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"
import { ActivityChart } from "./components/activity-chart"
import { DistributionChart } from "./components/distribution-chart"
import { useAdminContext } from '@/context/admin'

export default function DashboardPage() {
  const {
    userStats: {totalUsers},
    trainerStats: {activeTrainers, trainers},
    sessionsStats: {pendingSessions}
  } = useAdminContext()
  return (
    <div className="space-y-6 p-6 lg:ml-64">
      <main className="p-4 pt-7">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <UnifiedStatCard
            icon={Users}
            title="Total Users"
            value={totalUsers.toString()}
            className="bg-blue-600 dark:bg-blue-700"
          />
          <UnifiedStatCard
            icon={Dumbbell}
            title="Active Trainers"
            value={activeTrainers.toString()}
            className="bg-green-600 dark:bg-green-700"
          />
          <UnifiedStatCard
            icon={Calendar}
            title="Pending Sessions"
            value={pendingSessions.toString()}
            className="bg-amber-600 dark:bg-amber-700"
          />
          <UnifiedStatCard
            icon={MessageSquare}
            title="Active Posts"
            value="892"
            className="bg-pink-600 dark:bg-pink-700"
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ActivityChart />
          <DistributionChart />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-[#0284C7] p-6">
            <h3 className="mb-4 text-lg font-medium text-white">Active Trainers</h3>
            <div className="space-y-4">
              {trainers.map((trainer) => (
                <div key={trainer.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-sky-700" />
                    <div>
                      <p className="font-medium text-white">{trainer.name}</p>
                      <p className="text-sm text-sky-200">{trainer.sessions.length} sessions</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-sky-700 px-3 py-1 text-xs text-white">
                    {trainer.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-[#059669] p-6">
            <h3 className="mb-4 text-lg font-medium text-white">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { title: "New user registration: Emma Wilson", time: "2 minutes ago" },
                { title: "Session booked with Mike Johnson", time: "15 minutes ago" },
                { title: "Community post reported", time: "1 hour ago" },
              ].map((activity) => (
                <div key={activity.title} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <div>
                    <p className="font-medium text-white">{activity.title}</p>
                    <p className="text-sm text-emerald-200">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-[#7E22CE] p-6">
            <h3 className="mb-4 text-lg font-medium text-white">Support Queue</h3>
            <div className="space-y-4">
              {[
                { id: 1, title: "Payment Issue", from: "John Doe", waiting: "5 min" },
                { id: 2, title: "Schedule Change", from: "Lisa Chen", waiting: "12 min" },
              ].map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-700 text-sm font-medium text-white">
                    {ticket.id}
                  </div>
                  <div>
                    <p className="font-medium text-white">{ticket.title}</p>
                    <p className="text-sm text-purple-200">
                      From: {ticket.from}
                      <br />
                      Waiting: {ticket.waiting}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}