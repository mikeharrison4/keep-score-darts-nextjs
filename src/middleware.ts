import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
// import type { Database } from '@/lib/database.types';

const UNPROTECTED_PATHS = [
  '/',
  '/auth/login',
  '/auth/verification',
  '/auth/sign-up',
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && !UNPROTECTED_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};
