'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { useSession } from 'next-auth/react'

interface BlogInteractionsProps {
  blogId: string
  initialLikes: number
  initialComments: number
}

export function BlogInteractions({ blogId, initialLikes, initialComments }: BlogInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const { data: session } = useSession()

  const handleLike = async () => {
    if (!session?.user) return

    try {
      const like = {
        _type: 'like',
        blog: {
          _type: 'reference',
          _ref: blogId,
        },
        user: {
          _type: 'reference',
          _ref: session.user.id,
        },
      }

      await client.create(like)
      setLikes(likes + 1)
    } catch (error) {
      console.error('Error creating like:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user || !newComment.trim()) return

    try {
      const comment = {
        _type: 'comment',
        blog: {
          _type: 'reference',
          _ref: blogId,
        },
        user: {
          _type: 'reference',
          _ref: session.user.id,
        },
        text: newComment,
      }

      await client.create(comment)
      setComments(comments + 1)
      setNewComment('')
    } catch (error) {
      console.error('Error creating comment:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-1" onClick={handleLike}>
          <Heart className="h-4 w-4" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageCircle className="h-4 w-4" />
          {comments}
        </Button>
      </div>
      <form onSubmit={handleComment} className="mt-2 flex gap-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  )
}