import { options } from "@/auth/server/options"
import { } from "next"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const handler = NextAuth(options) as ((req:NextRequest)=>NextResponse)

export { handler as GET, handler as POST }

