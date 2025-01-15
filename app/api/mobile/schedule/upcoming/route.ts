import { authMiddleware } from "@/middleware"
import { PrismaClient } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const decoded = await authMiddleware(request) as JwtPayload & { role: string }
    const currentDate = new Date()
    
    const upcomingSchedules = await prisma.schedule.findMany({
      where: {
        OR: [
          { userId: decoded.id },
          { trainerId: decoded.id }
        ],
        date: {
          gt: currentDate
        }
      },
      include: {
        user: {
          select: {
            fullName: true,
            ...(decoded.role === "TRAINER" && {
              gender: true,
              birthDate: true
            })
          }
        },
        trainer: {
          select: {
            fullName: true
          }
        }
      }
    })

    return NextResponse.json({ schedules: upcomingSchedules })
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}