export type ScheduleStatus = 'pending' | 'waitingToApproved' | 'completed'

export interface Schedule {
  id: string
  date: Date
  startTime: Date
  endTime: Date
  scheduleLink?: string
  scheduleSubject: string
  scheduleDescription?: string
  status: ScheduleStatus
  userId: string
  trainerId: string
  user: {
    fullName: string | null
    gender?: 'MALE' | 'FEMALE' | null
    birthDate?: Date | null
  }
  trainer: {
    fullName: string | null
  }
  createdAt: Date
  updatedAt: Date
}

export interface CreateScheduleDTO {
  date: string
  startTime: string
  endTime: string
  scheduleLink?: string
  scheduleSubject: string
  scheduleDescription?: string
  trainerId?: string
}

export interface UpdateScheduleDTO {
  date?: string
  startTime?: string
  endTime?: string
  scheduleLink?: string
  scheduleSubject?: string
  scheduleDescription?: string
}

export interface ScheduleItem {
  title: string;
  startTime: string;
  endTime: string;
}

export interface CalendarEvent {
  title: string;
  time: string;
  type: "yoga" | "hiit";
}

export interface DaySchedule {
  date: string;
  events: CalendarEvent[];
}