import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Get cookie from request

  const authSession = request.cookies.get('cbt_student_auth')
  const cookieExists = request.cookies.has('cbt_student_auth')

  const originHeader = request.headers.get('Origin')
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get('Host')
  // console.log(
  //   originHeader,
  //   hostHeader,
  //   authSession,
  //   cookieExists,
  //   "Headers"
  //   // verifyRequestOrigin("http://localhost:8080", [hostHeader])
  // )

  if (!authSession || !authSession.value.length || !cookieExists) {
    console.log('UNAUTHORIZED access')
    // if (process.env.NODE_ENV === 'development') {
    //   return NextResponse.next()
    // }
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/overview', '/test', '/test/:path*', '/solution', '/solution/:path*', '/settings'],
}
