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
