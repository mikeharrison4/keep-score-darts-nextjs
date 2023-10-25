import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
// import type { Database } from '@/lib/database.types';

const UNPROTECTED_PATHS = [
  '/',
  '/login',
  '/auth/login',
  '/auth/logout',
  '/auth/verification',
  '/auth/sign-up',
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if user is signed in and the current path is / redirect the user to logged in page
  // if (session?.user && req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/logged-in', req.url));
  // }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!session?.user && !UNPROTECTED_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}
