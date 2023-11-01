import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';
import Login from '@/app/components/Login';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <Login />;
  } else {
    redirect('/config');
  }
}
