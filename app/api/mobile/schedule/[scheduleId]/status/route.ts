import { authMiddleware } from "@/middleware"
import { PrismaClient } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

interface RouteContext {
  params: Promise<{
    scheduleId: string
  }>
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const decoded = await authMiddleware(request) as JwtPayload & { role: string }
    
    if (decoded.role !== "TRAINER") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    const { scheduleId } = await context.params

    const body = await request.json()
    const { status } = body

    if (!status || !["pending", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    const schedule = await prisma.schedule.update({
      where: {
        id: scheduleId,
        trainerId: decoded.id
      },
      data: { status }
    })

    return NextResponse.json({ schedule })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    )
  }
}