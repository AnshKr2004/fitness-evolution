"use client"

import { Pencil, Trash2 } from 'lucide-react'
import { ScheduleItem } from "@/types/schedule"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TodaysScheduleProps {
  items: ScheduleItem[]
  onEdit: (item: ScheduleItem) => void
  onDelete: (item: ScheduleItem) => void
}

export function TodaysSchedule({ items, onEdit, onDelete }: TodaysScheduleProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Today&apos;s Schedule</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 md:gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-lg border p-3 md:p-4"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {item.startTime} - {item.endTime}
              </p>
            </div>
            <div className="flex gap-1 md:gap-2 ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(item)}
                className="h-7 w-7 md:h-8 md:w-8"
              >
                <Pencil className="h-3 w-3 md:h-4 md:w-4" />
                <span className="sr-only">Edit {item.title}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item)}
                className="h-7 w-7 md:h-8 md:w-8 text-destructive"
              >
                <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                <span className="sr-only">Delete {item.title}</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}