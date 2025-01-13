import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProgressItemProps {
  name: string
  goal: string
  progress: number
  onUpdateProgress: () => void
}

export function ProgressItem({ name, goal, progress, onUpdateProgress }: ProgressItemProps) {
  const getStatusBadge = () => {
    if (progress >= 90) return <Badge className="bg-green-100 text-green-800">Near Complete</Badge>
    return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{goal}: {progress}% Achieved</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getStatusBadge()}
        <Button 
          variant="outline" 
          size="sm" 
          className="text-blue-600"
          onClick={onUpdateProgress}
        >
          Update Progress
        </Button>
      </div>
    </div>
  )
}