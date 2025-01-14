"use client"

import { DaySchedule } from "@/types/schedule"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeeklyScheduleProps {
  days: DaySchedule[]
  onAddClass: () => void
  onExport: () => void
}

export function WeeklySchedule({ days, onAddClass, onExport }: WeeklyScheduleProps) {
  return (
    <Card className="mt-8 w-full min-w-[800px] lg:min-w-0">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>My Schedule</CardTitle>
          <div className="flex gap-2">
            <Button onClick={onAddClass} variant="default">
              Add Class
            </Button>
            <Button onClick={onExport} variant="outline" className=" border border-black">
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {days.map((day) => (
            <div key={day.date} className="space-y-2 md:space-y-4">
              <div className="text-center font-medium">{day.date}</div>
              <div className="min-h-[150px] space-y-2 rounded-lg border p-1 md:min-h-[200px] md:p-2">
                {day.events.map((event) => (
                  <div
                    key={`${event.title}-${event.time}`}
                    className={`rounded-md p-1.5 text-xs md:p-2 md:text-sm ${
                      event.type === "yoga"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="truncate">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}