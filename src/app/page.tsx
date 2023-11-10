import { cookies } from 'next/headers';

import Login from '@/app/components/Login';
import { createClient } from '@/utils/supabase/server';
import Config from '@/app/components/Config';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <Login />;
  } else {
    return <Config />;
    // redirect('/config');
  }
}
