"use client"

import { useEffect, useState } from 'react'
import { Schedule } from "@/types/schedule"
import { useSession } from 'next-auth/react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeeklyScheduleProps {
  onAddClass: () => void
  onExport: () => void
}

export function WeeklySchedule({ onAddClass, onExport }: WeeklyScheduleProps) {
  const [weeklySchedules, setWeeklySchedules] = useState<{ [key: string]: Schedule[] }>({})
  const { data: sessionData } = useSession()

  useEffect(() => {
    const fetchWeeklySchedules = async () => {
      const response = await fetch('/api/schedule/weekly')
      const data = await response.json()
      setWeeklySchedules(data.schedules)
    }

    fetchWeeklySchedules()
  }, [])

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
          {weekDays.map((day) => (
            <div key={day} className="space-y-2 md:space-y-4">
              <div className="text-center font-medium">{day}</div>
              <div className="min-h-[150px] space-y-2 rounded-lg border p-1 md:min-h-[200px] md:p-2">
                {weeklySchedules[day]?.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="rounded-md p-1.5 text-xs md:p-2 md:text-sm bg-blue-50 text-blue-700"
                  >
                    <div className="font-medium truncate">{schedule.scheduleSubject}</div>
                    <div className="truncate">
                      {new Date(schedule.startTime).toLocaleTimeString()} - {new Date(schedule.endTime).toLocaleTimeString()}
                    </div>
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