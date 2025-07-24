// this middleware is used to stop the access of non public endpoint like profile page and so on if the user is not logged in.


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname // tells what path you are in website.
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/forgotpassword' || path === '/resetpassword'

  const token = request.cookies.get("token")?.value || ""

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotpassword',
    '/resetpassword'
  ],
}