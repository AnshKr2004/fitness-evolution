import { authMiddleware } from "@/middleware"
import { PrismaClient } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const decoded = await authMiddleware(request) as JwtPayload & { role: string }
    const body = await request.json()
    
    const { 
      date,
      startTime,
      endTime,
      scheduleLink,
      scheduleSubject,
      scheduleDescription,
      trainerId 
    } = body

    if (!date || !startTime || !endTime || !scheduleSubject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const schedule = await prisma.schedule.create({
      data: {
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        scheduleLink,
        scheduleSubject,
        scheduleDescription,
        status: decoded.role === "TRAINER" ? "pending" : "waitingToApproved",
        userId: decoded.role === "TRAINER" ? trainerId : decoded.id,
        trainerId: decoded.role === "TRAINER" ? decoded.id : trainerId
      }
    })

    return NextResponse.json({ schedule }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}