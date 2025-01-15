import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: "ADMIN" | "TRAINER" | "USER"
      fullName?: string | null
      gender?: "MALE" | "FEMALE" | null
      birthDate?: Date | null
    }
  }

  interface User {
    id: string
    role: "ADMIN" | "TRAINER" | "USER"
    fullName?: string | null
    gender?: "MALE" | "FEMALE" | null
    birthDate?: Date | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "ADMIN" | "TRAINER" | "USER"
    fullName?: string | null
    gender?: "MALE" | "FEMALE" | null
    birthDate?: Date | null
  }
}