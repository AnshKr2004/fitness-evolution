import { authOptions } from "@/lib/auth.config"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

type RouteContext = {
  params: Promise<{
    scheduleId: string
  }>
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const decoded = await getServerSession(authOptions)
    const { scheduleId } = await context.params
    const body = await request.json()

    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid user" },
        { status: 403 }
      )
    }

    const schedule = await prisma.schedule.update({
      where: {
        id: scheduleId,
        OR: [
          { userId: decoded.user.id },
          { trainerId: decoded.user.id }
        ]
      },
      data: body
    })

    return NextResponse.json({ schedule })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { scheduleId } = await context.params

    await prisma.schedule.delete({
      where: {
        id: scheduleId,
        OR: [
          { userId: session.user.id },
          { trainerId: session.user.id }
        ]
      }
    })

    return NextResponse.json({ message: "Schedule deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    )
  }
}
