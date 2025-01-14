import { Pencil, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Session {
  id: string
  dateTime: string
  type: string
  trainer: {
    name: string
    avatar: string
  }
  client: {
    name: string
    avatar: string
  }
  status: "scheduled" | "pending"
}

interface SessionsTableProps {
  sessions: Session[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function SessionsTable({ sessions, onEdit, onDelete }: SessionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Session ID</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Trainer</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Meeting Link</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell className="font-medium">#{session.id}</TableCell>
            <TableCell>{session.dateTime}</TableCell>
            <TableCell>{session.type}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={session.trainer.avatar} />
                  <AvatarFallback>
                    {session.trainer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{session.trainer.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={session.client.avatar} />
                  <AvatarFallback>
                    {session.client.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{session.client.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className={session.status === "scheduled" ? "bg-green-50" : "bg-yellow-50"}
              >
                {session.status === "scheduled" ? "Join" : "Add Link"}
              </Button>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(session.id)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(session.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}