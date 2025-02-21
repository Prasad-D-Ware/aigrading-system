
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/helpers/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log("Middleware path:", pathname);

  if (
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/signup")
  ) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return NextResponse.json(
      { msg: "Unauthorized: Missing token" },
      { status: 401 }
    );
  }

  try {
    // console.log("Attempting to verify token:", {
    //   tokenFirstChars: token.substring(0, 20) + "...", // Log part of token for debugging
    //   secret: process.env.JWT_SECRET?.substring(0, 5) + "..." // Log part of secret for debugging
    // });

    // Try parsing the token first
    // const decoded = jwt.decode(token);
    // console.log("Decoded token payload:", decoded);

    // Now try verification
    const verified = verifyJWT(token, process.env.JWT_SECRET!);
    // console.log("Token verified successfully");
    
    return NextResponse.next();
  } catch (error: any) {
    console.error("Token verification failed:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        msg: "Unauthorized: Invalid token",
        error: `${error.name}: ${error.message}` // Include error details in response
      },
      { status: 401 }
    );
  }
}

export const config = {
  //   // Protect all /api routes EXCEPT for /api/login and /api/signup
    matcher: [
      "/api/:path*", // match all /api routes
  //     // "!/api/(auth)/login", // exclude login
  //     // "!/api/(auth)/signup", // exclude signup
    ],
  };