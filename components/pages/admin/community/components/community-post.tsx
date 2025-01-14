import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from 'lucide-react'

interface CommunityPostProps {
  author: {
    name: string
    image?: string
  }
  timeAgo: string
  content: string
  likes: number
  comments: number
}

export function CommunityPost({ author, timeAgo, content, likes, comments }: CommunityPostProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={author.image} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{author.name}</h4>
              <p className="text-sm text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <p className="mt-2">{content}</p>
          <div className="mt-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-1">
              <Heart className="h-4 w-4" />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle className="h-4 w-4" />
              {comments}
            </Button>
            <div className="ml-auto">
              <Button variant="ghost" size="sm">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}