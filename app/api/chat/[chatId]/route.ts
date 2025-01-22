import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.config"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: params.chatId,
        trainerId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    return NextResponse.json({ chat })
  } catch (error) {
    console.error("Error fetching chat:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}