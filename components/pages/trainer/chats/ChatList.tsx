import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Chat {
  id: string
  user: {
    name: string | null
    image: string | null
  }
  messages: {
    content: string
    createdAt: Date
  }[]
}

interface ChatListProps {
  chats: Chat[]
}

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {chats.map((chat) => (
        <Link href={`/trainer/chats/${chat.id}`} key={chat.id}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="flex items-center p-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={chat.user.image || undefined} alt={chat.user.name || "User"} />
                <AvatarFallback>{chat.user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className="font-semibold">{chat.user.name || "User"}</h3>
                <p className="text-sm text-gray-500 truncate">{chat.messages[0]?.content || "No messages yet"}</p>
              </div>
              <div className="text-xs text-gray-400">{chat.messages[0]?.createdAt.toLocaleDateString() || ""}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}