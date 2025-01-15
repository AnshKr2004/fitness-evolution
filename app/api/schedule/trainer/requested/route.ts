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

    const requestedSchedules = await prisma.schedule.findMany({
      where: {
        trainerId: decoded.id,
        status: "waitingToApproved"
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

    return NextResponse.json({ schedules: requestedSchedules })
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}