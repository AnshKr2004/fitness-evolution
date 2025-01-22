import { authOptions } from "@/lib/auth.config"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        chatId: params.chatId,
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
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const decoded = await getServerSession(authOptions);

    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid user" },
        { status: 403 }
      );
    }
    const { content } = await request.json()

    const message = await prisma.message.create({
      data: {
        content,
        chatId: params.chatId,
        senderId: decoded.user.id,
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
    })

    return NextResponse.json({ message })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}
