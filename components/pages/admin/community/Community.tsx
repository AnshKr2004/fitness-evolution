import { Dumbbell, Star, Users, Users2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CommunityPost } from "./components/community-post"
import { UnifiedStatCard } from "@/components/pages/components/unified-stat-card"

const stats = [
  {
    title: "Total Trainers",
    value: "42",
    icon: Dumbbell,
    className: "bg-blue-600 dark:bg-blue-700",
  },
  {
    title: "Active Trainers",
    value: "35",
    icon: Users2,
    className: "bg-green-600 dark:bg-green-700",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    icon: Star,
    className: "bg-amber-600 dark:bg-amber-700",
  },
  {
    title: "Total Clients",
    value: "856",
    icon: Users,
    className: "bg-purple-600 dark:bg-purple-700",
  },
]

const posts = [
  {
    author: {
      name: "Sarah Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    timeAgo: "2 hours ago",
    content: "Just completed an amazing HIIT session with my group! The energy was incredible 🔥 #FitnessEvolution #HIIT",
    likes: 24,
    comments: 8,
  },
  {
    author: {
      name: "Mike Thompson",
      image: "/placeholder.svg?height=40&width=40",
    },
    timeAgo: "5 hours ago",
    content: "New personal best on deadlifts today! Thanks to everyone for the support and motivation 💪 #Strength #Progress",
    likes: 42,
    comments: 15,
  },
  {
    author: {
      name: "Emma Davis",
      image: "/placeholder.svg?height=40&width=40",
    },
    timeAgo: "Yesterday",
    content: "Excited to announce our new yoga workshop next week! Limited spots available. Sign up now! 🧘‍♀️ #YogaLife #Wellness",
    likes: 56,
    comments: 23,
  },
  {
    author: {
      name: "David Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    timeAgo: "Yesterday",
    content: "Great nutrition seminar today! Thanks to all who attended. Remember: abs are made in the kitchen! 🥗 #HealthyLiving",
    likes: 38,
    comments: 12,
  },
]

export default function Community() {
  return (
    <div className="flex-1 space-y-8 p-8 lg:ml-64">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <UnifiedStatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="lg:flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-5 lg:mb-0">Community Management</h2>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search posts..."
              className="w-[300px]"
            />
            <Button className='bg-blue-600 dark:bg-blue-700'>+ New Post</Button>
          </div>
        </div>

        <div className="space-y-4 grid lg:grid-cols-2">
          {posts.map((post) => (
            <CommunityPost key={post.content} {...post} />
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full"
        >
          Load More
        </Button>
      </div>
    </div>
  )
}