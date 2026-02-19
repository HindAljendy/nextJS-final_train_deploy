import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/verifyToken";
import { JWTPayload } from "./utils/types";



/* Train Middelware " 1 " :
export function middleware (request:NextRequest){
    console.log("Middleware is called");
}

export const config = {
    matcher : ["/"]
} 
*/

// Train Middelware " 2 " 
//" Check for the existence of the token in request DELETE profile and other routes"
// Access : Private 
export function middleware(request: NextRequest) {

    //const token = request.headers.get("authToken") as String;

    // Get Token from cookies :
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;

    // التأكد من وجود التوكن


    const { pathname } = request.nextUrl;
    const method = request.method;


    if ((pathname === "/api/articles" || pathname.startsWith("/api/articles/")) && method === "GET") {
        // تمرير الطلب بدون تحقق من التوكن
        return NextResponse.next();
    }


    if (!token) {
        /* api اذا كان التوكن غير موجود نتعامل هنا مع  */

        if ((pathname === "/api/articles" || pathname.startsWith("/api/articles/") ||
            pathname === "/api/comments" || pathname.startsWith("/api/comments/") ||
            pathname === "/api/users/logout" || pathname.startsWith("/api/users/profile/"))
        ) {
            return NextResponse.json(
                { message: "From Middleware : no token provided, Access Denied, Un Authorized" },
                { status: 401 }
            );
        }
    } else {
        /* اذا كان التوكن موجود نتعامل هنا مع صفحات */
        if (
            request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/register"
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // السماح بمرور الطلب
    return NextResponse.next();
}

export const config = {
    matcher: [

        "/api/users/profile/:path*", "/api/users/logout",
        "/api/comments", "/api/comments/:path*",
        "/api/articles", "/api/articles/:path*",

        "/login", "/register"
    ]
}

