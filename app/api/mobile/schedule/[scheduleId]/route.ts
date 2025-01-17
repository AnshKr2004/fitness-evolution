import { authMiddleware } from "@/middleware"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { JwtPayload } from "jsonwebtoken"

const prisma = new PrismaClient()

type RouteContext = {
  params: Promise<{
    scheduleId: string
  }>
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const decoded = await authMiddleware(request) as JwtPayload & { role: string }
    const { scheduleId } = await context.params
    
    const schedule = await prisma.schedule.findUnique({
      where: {
        id: scheduleId
      },
      include: {
        user: {
          select: {
            name: true,
            ...(decoded.role === "TRAINER" && {
              gender: true,
              birthDate: true
            })
          }
        },
        trainer: {
          select: {
            name: true
          }
        }
      }
    })

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      )
    }

    if (schedule.userId !== decoded.id && schedule.trainerId !== decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    return NextResponse.json({ schedule })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
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