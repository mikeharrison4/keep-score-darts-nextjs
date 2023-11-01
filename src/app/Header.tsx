'use client';

import React from 'react';
import styled from 'styled-components';
import { Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const Container = styled.div({
  marginBottom: '2.4rem',
});

const MainHeading = styled.div({
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  borderBottom: '4px solid',

  h1: {
    width: '100%',
    color: 'white',
    padding: '1.2rem',
  },

  h6: {
    marginRight: '12px',
  },
});

function Header({ session }: { session: Session | null }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/auth/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <Container>
      <MainHeading>
        <h1>KeepScore Darts 🎯</h1>
        {session?.user && (
          <>
            <h4>{session.user.email}</h4>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </MainHeading>
    </Container>
  );
}

export default Header;
