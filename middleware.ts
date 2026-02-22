// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth"; // o tu config actual

export default auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;
    const isDashboard = nextUrl.pathname.startsWith("/dashboard");

    if (isDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/", "/dashboard/:path*", "/todos"],
}