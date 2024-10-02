import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req });
        const isAuth = !!token;
        const authPage =
            req.nextUrl.pathname === "/" ||
            req.nextUrl.pathname.startsWith("/login");


        if (authPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/home", req.url));
            }

            return null;
        }

        if (!isAuth) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            }
        }
    }
);

export const config = {
    matcher: ["/", "/login", "/home", "/tweet\/([0-9]+)", "/profile\/([0-9]+)"],
}