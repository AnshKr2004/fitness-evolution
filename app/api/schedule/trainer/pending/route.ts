import { authMiddleware } from "@/middleware"
import { PrismaClient } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const decoded = await authMiddleware(request) as JwtPayload & { role: string }
    
    if (decoded.role !== "TRAINER") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    const currentDate = new Date()
    const pendingSchedules = await prisma.schedule.findMany({
      where: {
        trainerId: decoded.id,
        status: "pending",
        endTime: {
          lt: currentDate
        }
      },
      include: {
        user: {
          select: {
            fullName: true,
            gender: true,
            birthDate: true
          }
        }
      }
    })

    return NextResponse.json({ schedules: pendingSchedules })
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}