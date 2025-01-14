import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle } from 'lucide-react'

interface Post {
  content: string
  likes: number
  comments: number
  timeAgo: string
}

const posts: Post[] = [
  {
    content: "Here are 5 essential tips for an effective morning workout routine...",
    likes: 24,
    comments: 8,
    timeAgo: "2 hours ago",
  },
  {
    content: "Starting next week, we're adding two new HIIT classes...",
    likes: 18,
    comments: 5,
    timeAgo: "5 hours ago",
  },
]

export function CommunityPosts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Community Posts</CardTitle>
        <Button variant="default">Create New Post</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-4 text-card-foreground"
          >
            <p className="mb-4">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes} likes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments} comments</span>
              </div>
              <span className="ml-auto">{post.timeAgo}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}