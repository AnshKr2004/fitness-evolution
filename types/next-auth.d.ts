import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: "ADMIN" | "TRAINER"
    }
  }

  interface User {
    role: "ADMIN" | "TRAINER"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "TRAINER"
  }
}