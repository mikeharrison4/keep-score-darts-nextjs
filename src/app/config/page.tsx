import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ConfigCreation from '@/app/config/ConfigCreation';

async function Config() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <ConfigCreation session={session} />;
}

export default Config;
