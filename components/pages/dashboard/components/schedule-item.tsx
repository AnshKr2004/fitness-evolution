import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ScheduleItemProps {
  name: string
  time: string
  type: string
  status: "upcoming" | "confirmed"
}

export function ScheduleItem({ name, time, type, status }: ScheduleItemProps) {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    confirmed: "bg-green-100 text-green-800"
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{time} · {type}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <Button variant="outline" size="sm">
          Join Meet
        </Button>
      </div>
    </div>
  )
}