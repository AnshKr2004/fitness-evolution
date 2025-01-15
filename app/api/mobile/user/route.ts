import { Gender, PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const headersList = await headers()
    const authorization = headersList.get("authorization")
    const token = authorization?.split(" ")[1]

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JwtPayload & { id: string }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const headersList = await headers()
    const authorization = headersList.get("authorization")
    const token = authorization?.split(" ")[1]

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JwtPayload & { id: string }
    const body = await request.json()
    const { fullName, gender, profileImage, birthDate, email, password } = body

    const updateData: {
      fullName?: string;
      gender?: Gender;
      image?: string;
      birthDate?: Date | null;
      email?: string;
      password?: string;
    } = {}
    if (fullName !== undefined) updateData.fullName = fullName
    if (gender !== undefined) {
      if (gender === "MALE" || gender === "FEMALE") {
        updateData.gender = gender as Gender
      } else {
        return NextResponse.json(
          { error: "Invalid gender value. Must be 'MALE' or 'FEMALE'." },
          { status: 400 }
        )
      }
    }
    if (profileImage !== undefined) updateData.image = profileImage
    if (birthDate !== undefined) updateData.birthDate = birthDate ? new Date(birthDate) : null
    if (email !== undefined) updateData.email = email
    if (password !== undefined) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: updateData
    })

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { error: error},
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const headersList = await headers()
    const authorization = headersList.get("authorization")
    const token = authorization?.split(" ")[1]

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JwtPayload & { id: string }
    
    await prisma.user.delete({
      where: { id: decoded.id }
    })

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}