import { authOptions } from "@/lib/auth.config";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const totalTrainers = await prisma.user.count({
      where: { role: "TRAINER" },
    });
    const activeTrainers = await prisma.user.count({
      where: { role: "TRAINER", status: "ACTIVE" },
    });

    const trainers = await prisma.user.findMany({
      where: { role: "TRAINER" },
      select: { rating: true, clientsCount: true },
    });

    const totalRating = trainers.reduce(
      (sum, trainer) => sum + (trainer.rating || 0),
      0
    );
    const avgRating = totalTrainers > 0 ? totalRating / totalTrainers : 0;

    const totalClients = trainers.reduce(
      (sum, trainer) =>
        sum + (trainer.clientsCount !== null ? trainer.clientsCount : 0),
      0
    );

    return NextResponse.json({
      totalTrainers,
      activeTrainers,
      avgRating,
      totalClients,
    });
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
