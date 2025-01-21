import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const currentUser = request.cookies.get('currentUser')

  console.log(`El usuario actual es: ${JSON.stringify(currentUser)}`);
  console.log(request.nextUrl.pathname);
  
  if (currentUser && !request.nextUrl.pathname.startsWith('/store-selector')) {
    return Response.redirect(new URL('/store-selector', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/login', '/store-selector'],
}