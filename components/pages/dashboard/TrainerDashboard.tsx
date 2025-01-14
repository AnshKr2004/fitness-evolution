'use client'

import { useState } from "react"
import { Settings } from 'lucide-react'
import { StatCard } from "./components/stat-card"
import { ScheduleItem } from "./components/schedule-item"
import { ProgressItem } from "./components/progress-item"
import { ProgressModal } from "./components/progress-modal"
import { Button } from "@/components/ui/button"

export default function TrainerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUpdateProgress = (data: { clientName: string; progress: number; notes: string }) => {
    console.log('Progress updated:', data)
    // Handle progress update logic here
  }

  return (
    <div className="space-y-6 p-6 lg:ml-64">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total Clients" value={24} type="clients" />
          <StatCard title="Active Programs" value={8} type="programs" />
          <StatCard title="Sessions Today" value={5} type="sessions" />
        </div>

        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Trainer Dashboard Overview</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Schedule Section */}
          <div className="bg-white rounded-lg shadow">
            <h2 className="p-4 font-medium border-b">Today&apos;s Schedule</h2>
            <div>
              <ScheduleItem
                name="Emma Davis"
                time="9:00 AM"
                type="Strength Training"
                status="upcoming"
              />
              <ScheduleItem
                name="Tom Brown"
                time="11:30 AM"
                type="HIIT Session"
                status="confirmed"
              />
            </div>
          </div>

          {/* Progress Updates Section */}
          <div className="bg-white rounded-lg shadow">
            <h2 className="p-4 font-medium border-b">Client Progress Updates</h2>
            <div>
              <ProgressItem
                name="Lisa Chen"
                goal="Weight Goal"
                progress={80}
                onUpdateProgress={() => setIsModalOpen(true)}
              />
              <ProgressItem
                name="John Smith"
                goal="Strength Goal"
                progress={95}
                onUpdateProgress={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Progress Update Modal */}
        <ProgressModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateProgress}
        />
      </div>
    </div>
  )
}