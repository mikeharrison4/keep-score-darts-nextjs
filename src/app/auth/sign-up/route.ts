import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// import type { Database } from '@/lib/database.types';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        data: {
          display_name: 'Mike',
        },
      },
    });

    if (error) {
      throw error;
    }

    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    });
  } catch (error: any) {
    return NextResponse.json(error, { status: error.status });
  }
}
