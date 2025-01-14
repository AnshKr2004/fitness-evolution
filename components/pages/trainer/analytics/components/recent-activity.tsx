import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  member: string
  activity: string
  post: string
  time: string
}

const activities: Activity[] = [
  {
    member: "John Doe",
    activity: "Commented",
    post: "Morning Workout Tips",
    time: "5 mins ago",
  },
  {
    member: "Sarah Smith",
    activity: "Liked",
    post: "New HIIT Class Schedule",
    time: "15 mins ago",
  },
  {
    member: "Mike Johnson",
    activity: "Posted",
    post: "Nutrition Guide",
    time: "1 hour ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Community Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Post</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, i) => (
              <TableRow key={i}>
                <TableCell>{activity.member}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.post}</TableCell>
                <TableCell className="text-right">{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}