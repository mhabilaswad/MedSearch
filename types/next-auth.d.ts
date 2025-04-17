// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    id: string
    email: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
  }
}
