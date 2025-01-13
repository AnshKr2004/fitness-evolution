import { Users, Dumbbell, Calendar, MessageSquare } from 'lucide-react'
import { StatsCard } from "./components/stats-card"
import { ActivityChart } from "./components/activity-chart"
import { DistributionChart } from "./components/distribution-chart"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <main className="ml-64 p-4 pt-7">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={<Users className="h-8 w-8 text-white" />}
            title="Total Users"
            value="2,543"
            className="bg-blue-500"
          />
          <StatsCard
            icon={<Dumbbell className="h-8 w-8 text-white" />}
            title="Active Trainers"
            value="48"
            className="bg-green-500"
          />
          <StatsCard
            icon={<Calendar className="h-8 w-8 text-white" />}
            title="Pending Sessions"
            value="156"
            className="bg-orange-500"
          />
          <StatsCard
            icon={<MessageSquare className="h-8 w-8 text-white" />}
            title="Active Posts"
            value="892"
            className="bg-pink-500"
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
              {[
                { name: "Mike Johnson", sessions: "5 sessions today", status: "Online" },
                { name: "Sarah Smith", sessions: "3 sessions today", status: "Busy" },
                { name: "David Lee", sessions: "4 sessions today", status: "Offline" },
              ].map((trainer) => (
                <div key={trainer.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-sky-700" />
                    <div>
                      <p className="font-medium text-white">{trainer.name}</p>
                      <p className="text-sm text-sky-200">{trainer.sessions}</p>
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