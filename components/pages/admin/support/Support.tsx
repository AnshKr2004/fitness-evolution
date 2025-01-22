import { AlertCircle, MessageCircle, Users } from 'lucide-react'

import { ChatEntry } from "./components/chat-entry"
import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  {
    title: "Active Alerts",
    value: "8",
    icon: AlertCircle,
    className: "bg-red-600 dark:bg-red-700",
  },
  {
    title: "Active Chats",
    value: "15",
    icon: MessageCircle,
    className: "bg-blue-600 dark:bg-blue-700",
  },
  {
    title: "Online Users",
    value: "42",
    icon: Users,
    className: "bg-green-600 dark:bg-green-700",
  },
]

type ChatData = {
  name: string
  status: string
  indicator: "Live" | "Alert" | "Critical" | "New"
}

const activeChats: ChatData[] = [
  {
    name: "John Smith",
    status: "Active with 3 clients",
    indicator: "Live",
  },
  {
    name: "Sarah Johnson",
    status: "Active with 2 clients",
    indicator: "Live",
  },
  {
    name: "Mike Wilson",
    status: "Active with 1 client",
    indicator: "Live",
  },
]

const chatMonitors: ChatData[] = [
  {
    name: "Emma Davis",
    status: "Chatting with John Smith",
    indicator: "Alert",
  },
  {
    name: "Tom Brown",
    status: "Chatting with Sarah Johnson",
    indicator: "Critical",
  },
  {
    name: "Lisa Chen",
    status: "Chatting with Mike Wilson",
    indicator: "New",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8 lg:ml-64">
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <UnifiedStatCard key={metric.title} {...metric} />
        ))}
      </div> */}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Chats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {activeChats.map((chat) => (
              <ChatEntry key={chat.name} {...chat} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat Monitor & Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {chatMonitors.map((monitor) => (
              <ChatEntry key={monitor.name} {...monitor} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}