import Login from '@/app/components/Login';
import Dashboard from '@/app/components/Dashboard';
import { getSupabaseServerClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = getSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <Login />;
  } else {
    return <Dashboard userId={session.user.id} />;
  }
}
