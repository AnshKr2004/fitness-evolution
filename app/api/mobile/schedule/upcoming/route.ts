import { authMiddleware } from "@/middleware";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const decoded = (await authMiddleware(request)) as JwtPayload & {
      role: string;
    };

    const upcomingSchedules = await prisma.schedule.findMany({
      where: {
        OR: [{ userId: decoded.id }, { trainerId: decoded.id }],
        status: "upcoming",
      },
      include: {
        user: {
          select: {
            name: true,
            ...(decoded.role === "TRAINER" && {
              gender: true,
              birthDate: true,
            }),
          },
        },
        trainer: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ schedules: upcomingSchedules });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
