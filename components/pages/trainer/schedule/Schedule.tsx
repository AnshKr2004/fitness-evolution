"use client"

import { useState } from "react"
import { ScheduleItem } from "@/types/schedule"
import { TodaysSchedule } from "./components/todays-schedule"
import { WeeklySchedule } from "./components/weekly-schedule"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const initialTodaySchedule: ScheduleItem[] = [
  {
    title: "Yoga Basics",
    startTime: "7:00 AM",
    endTime: "8:00 AM",
  },
  {
    title: "HIIT Training",
    startTime: "8:30 AM",
    endTime: "9:30 AM",
  },
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const initialWeeklySchedule = weekDays.map((day) => ({
  date: day,
  events:
    day === "Mon"
      ? [{ title: "Yoga", time: "7:00 AM", type: "yoga" as const }]
      : day === "Tue"
      ? [{ title: "HIIT", time: "8:30 AM", type: "hiit" as const }]
      : [],
}))

export default function SchedulePage() {
  const [todaySchedule, setTodaySchedule] = useState(initialTodaySchedule)
  const weeklySchedule = initialWeeklySchedule

  const handleEdit = (item: ScheduleItem) => {
    // Implement edit functionality
    console.log("Edit:", item)
  }

  const handleDelete = (item: ScheduleItem) => {
    setTodaySchedule((prev) => prev.filter((i) => i !== item))
  }

  const handleAddClass = () => {
    // Implement add class functionality
    console.log("Add class")
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Export schedule")
  }

  return (
    <div className="space-y-6 p-2 lg:ml-64">
      <div className="h-full px-4 py-6 lg:px-8">
        <TodaysSchedule
          items={todaySchedule}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ScrollArea className="w-full">
          <div className="pr-4">
            <WeeklySchedule
              days={weeklySchedule}
              onAddClass={handleAddClass}
              onExport={handleExport}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}