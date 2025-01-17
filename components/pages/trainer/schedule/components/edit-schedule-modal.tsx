"use client"

import { useState } from 'react'
import { Schedule } from "@/types/schedule"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditScheduleModalProps {
    schedule: Schedule | null
    isOpen: boolean
    onClose: () => void
    onSave: (updatedSchedule: Partial<Schedule>) => void
}

export function EditScheduleModal({ schedule, isOpen, onClose, onSave }: EditScheduleModalProps) {
    const [date, setDate] = useState(schedule?.date ? new Date(schedule.date).toISOString().split('T')[0] : '')
    const [startTime, setStartTime] = useState(schedule?.startTime ? new Date(schedule.startTime).toISOString().split('T')[1].slice(0, 5) : '')
    const [endTime, setEndTime] = useState(schedule?.endTime ? new Date(schedule.endTime).toISOString().split('T')[1].slice(0, 5) : '')

    const handleSave = () => {
        onSave({
            date: new Date(date),
            startTime: new Date(`${date}T${startTime}`),
            endTime: new Date(`${date}T${endTime}`),
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Schedule</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startTime" className="text-right">
                            Start Time
                        </Label>
                        <Input
                            id="startTime"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endTime" className="text-right">
                            End Time
                        </Label>
                        <Input
                            id="endTime"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}