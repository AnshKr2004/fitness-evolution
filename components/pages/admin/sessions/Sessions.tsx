"use client"

import { useState } from "react"
import { Activity, Calendar, Clock, TrendingUp } from 'lucide-react'
import { AssignSessionModal } from "./components/assign-session-modal"
import { SessionsTable } from "./components/sessions-table"
import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Participant {
  name: string
  avatar: string
}

interface Session {
  id: string
  dateTime: string
  type: string
  trainer: Participant
  client: Participant
  status: 'scheduled' | 'pending'
}

interface AssignSessionData {
  sessionId: string
  dateTime: string
  sessionType: string
}

const mockSessions: Session[] = [
  {
    id: "S1234",
    dateTime: "2024-02-20 10:00 AM",
    type: "Strength Training",
    trainer: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg",
    },
    client: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg",
    },
    status: "scheduled",
  },
  {
    id: "S1235",
    dateTime: "2024-02-20 11:30 AM",
    type: "Yoga",
    trainer: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg",
    },
    client: {
      name: "John Davis",
      avatar: "/placeholder.svg",
    },
    status: "pending",
  },
]

export default function Sessions() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sessions, setSessions] = useState<Session[]>(mockSessions)

  const handleAssignSession = (data: AssignSessionData) => {
    setSessions([
      ...sessions,
      {
        id: data.sessionId,
        dateTime: data.dateTime,
        type: data.sessionType,
        trainer: {
          name: "New Trainer",
          avatar: "/placeholder.svg",
        },
        client: {
          name: "New Client",
          avatar: "/placeholder.svg",
        },
        status: "pending",
      },
    ])
  }

  return (
    <div className="space-y-8 p-8 lg:ml-64">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <UnifiedStatCard
          title="Total Sessions"
          value="128"
          icon={Calendar}
          className="bg-blue-600 dark:bg-blue-700"
        />
        <UnifiedStatCard
          title="Active Sessions"
          value="45"
          icon={Clock}
          className="bg-green-600 dark:bg-green-700"
        />
        <UnifiedStatCard
          title="Pending Sessions"
          value="15"
          icon={Activity}
          className="bg-amber-600 dark:bg-amber-700"
        />
        <UnifiedStatCard
          title="Completion Rate"
          value="92%"
          icon={TrendingUp}
          className="bg-purple-600 dark:bg-purple-700"
        />
      </div>

      <div className="space-y-4">
        <div className="lg:flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-5 lg:mb-0">Session Management</h2>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search sessions..."
              className="w-[300px]"
            />
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 dark:bg-blue-700">
              Assign Session
            </Button>
          </div>
        </div>

        <SessionsTable
          sessions={sessions}
          onEdit={(id) => console.log("Edit session", id)}
          onDelete={(id) => {
            setSessions(sessions.filter((session) => session.id !== id))
          }}
        />

        <div className="text-sm text-muted-foreground">
          Showing 1 to 2 of 128 results
        </div>
      </div>

      <AssignSessionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAssignSession}
      />
    </div>
  )
}