"use client"

import { useState, useEffect } from "react"
import { Schedule } from "@/types/schedule"
import { TodaysSchedule } from "./components/todays-schedule"
import { WeeklySchedule } from "./components/weekly-schedule"
import { EditScheduleModal } from "./components/edit-schedule-modal"
import { DeleteScheduleModal } from "./components/delete-schedule-modal"
import { AddClassModal } from "./components/add-class-modal"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { toast } from "sonner"

interface User {
  id: string;
  name: string;
}

export default function SchedulePage() {
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [deletingSchedule, setDeletingSchedule] = useState<Schedule | null>(null)
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users/user')
      const data = await response.json()
      setUsers(data.users)
    }
    fetchUsers()
  }, [])

  const handleEdit = (item: Schedule) => {
    setEditingSchedule(item)
  }

  const handleDelete = (item: Schedule) => {
    setDeletingSchedule(item)
  }

  const handleSaveEdit = async (updatedSchedule: Partial<Schedule>) => {
    if (editingSchedule) {
      try {
        const response = await fetch(`/api/schedule/${editingSchedule.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSchedule),
        })
        if (response.ok) {
          toast.success("Schedule updated successfully")
          // Refresh the schedules
          window.location.reload()
        } else {
          toast.error("Failed to update schedule")
        }
      } catch (error) {
        console.error('Error updating schedule:', error)
        toast.error("An error occurred while updating the schedule")
      }
    }
    setEditingSchedule(null)
  }

  const handleConfirmDelete = async () => {
    if (deletingSchedule) {
      try {
        const response = await fetch(`/api/schedule/${deletingSchedule.id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          toast.success("Schedule deleted successfully")
          // Refresh the schedules
          window.location.reload()
        } else {
          toast.error("Failed to delete schedule")
        }
      } catch (error) {
        console.error('Error deleting schedule:', error)
        toast.error("An error occurred while deleting the schedule")
      }
    }
    setDeletingSchedule(null)
  }

  const handleAddClass = () => {
    setIsAddClassModalOpen(true)
  }

  const handleSaveNewClass = async (newClass: {
    date: string;
    startTime: string;
    endTime: string;
    scheduleSubject: string;
    scheduleDescription: string;
    userId: string;
  }) => {
    try {
      const response = await fetch('/api/schedule/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newClass,
          date: new Date(newClass.date).toISOString(),
          startTime: new Date(newClass.startTime).toISOString(),
          endTime: new Date(newClass.endTime).toISOString(),
        }),
      })
      if (response.ok) {
        toast.success("New class added successfully")
        // Refresh the schedules
        window.location.reload()
      } else {
        toast.error("Failed to add new class")
      }
    } catch (error) {
      console.error('Error adding new class:', error)
      toast.error("An error occurred while adding the new class")
    }
    setIsAddClassModalOpen(false)
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Export schedule")
  }

  return (
    <div className="space-y-6 p-2 lg:ml-64">
      <div className="h-full px-4 py-6 lg:px-8">
        <TodaysSchedule
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ScrollArea className="w-full">
          <div className="pr-4">
            <WeeklySchedule
              onAddClass={handleAddClass}
              onExport={handleExport}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <EditScheduleModal
        schedule={editingSchedule}
        isOpen={!!editingSchedule}
        onClose={() => setEditingSchedule(null)}
        onSave={handleSaveEdit}
      />
      <DeleteScheduleModal
        schedule={deletingSchedule}
        isOpen={!!deletingSchedule}
        onClose={() => setDeletingSchedule(null)}
        onConfirm={handleConfirmDelete}
      />
      <AddClassModal
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        onSave={handleSaveNewClass}
        users={users}
      />
    </div>
  )
}