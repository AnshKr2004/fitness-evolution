import { authMiddleware } from "@/middleware";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const decoded = await authMiddleware(request) as JwtPayload

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      where: { role: "TRAINER" },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        birthDate: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
