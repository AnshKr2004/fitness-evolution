import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ChatEntryProps {
  name: string
  status: string
  indicator?: "Live" | "Alert" | "Critical" | "New"
}

export function ChatEntry({ name, status, indicator }: ChatEntryProps) {
  const getIndicatorStyles = (type?: string) => {
    switch (type) {
      case "Live":
        return "bg-green-500 text-white"
      case "Alert":
        return "bg-yellow-500 text-white"
      case "Critical":
        return "bg-red-500 text-white"
      case "New":
        return "bg-blue-500 text-white"
      default:
        return ""
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
      </div>
      {indicator && (
        <Badge variant="secondary" className={cn("ml-auto", getIndicatorStyles(indicator))}>
          {indicator}
        </Badge>
      )}
    </div>
  )
}