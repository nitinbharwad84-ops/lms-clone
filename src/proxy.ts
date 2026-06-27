import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Enforces authentication redirects for dashboard and login routes while proxying request cookies to Supabase and preserving any response-set cookies.
 *
 * Creates a Supabase server client bound to the incoming request's cookies, retrieves the current user, and:
 * - redirects unauthenticated requests for dashboard routes to `/login`
 * - redirects authenticated requests for auth pages to `/dashboard`
 * Otherwise returns the proxied response with cookies synchronized.
 *
 * @param request - The incoming Next.js request to evaluate and proxy
 * @returns A NextResponse representing either the original proxied response or a redirect to `/login` or `/dashboard` depending on authentication state
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protection logic
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/admin/login')
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard') || 
                      request.nextUrl.pathname.startsWith('/teacher') || 
                      request.nextUrl.pathname.startsWith('/admin/dashboard')

  if (!user && isDashboard) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
