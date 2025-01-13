import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ProgressModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: { clientName: string; progress: number; notes: string }) => void
}

export function ProgressModal({ open, onClose, onSave }: ProgressModalProps) {
  const [clientName, setClientName] = useState("")
  const [progress, setProgress] = useState("")
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    onSave({
      clientName,
      progress: Number(progress),
      notes
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Client Progress</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="progress">Current Progress</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage (0-100)"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Progress</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}