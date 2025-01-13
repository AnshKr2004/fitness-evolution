import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, role } = body

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || "TRAINER" // Default to TRAINER if no role is provided
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return new NextResponse("Error", { status: 500 })
  }
}