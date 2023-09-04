// middleware.ts
import { NextRequest, NextResponse } from "next/server"

const middleware = async (request: NextRequest) => {
  // @ts-ignore
  const remoteMiddleware = await import("host-app/middleware")
  return remoteMiddleware(request)
}

export default middleware
