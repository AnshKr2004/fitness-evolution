import { Users, Dumbbell, Calendar } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: number
  type: "clients" | "programs" | "sessions"
}

export function StatCard({ title, value, type }: StatCardProps) {
  const icons = {
    clients: <Users className="w-6 h-6 text-white" />,
    programs: <Dumbbell className="w-6 h-6 text-white" />,
    sessions: <Calendar className="w-6 h-6 text-white" />
  }

  const bgColors = {
    clients: "bg-purple-500",
    programs: "bg-blue-500",
    sessions: "bg-green-500"
  }

  return (
    <Card className={`${bgColors[type]} text-white`}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="p-2 bg-white/20 rounded-full">
          {icons[type]}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}