'use client';

import React from 'react';
import { GlobalStyle } from '@/app/globalStyles';
import styled from 'styled-components';
import {
  createClientComponentClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';

type ConfigProps = {
  session: Session | null;
};

const Container = styled.div({
  maxWidth: '1000px',
  color: 'white',
  margin: 'auto',
});

const MainHeading = styled.div({
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

function ConfigCreation({ session }: ConfigProps) {
  const router = useRouter();

  return <Container>logged in</Container>;
}

export default ConfigCreation;
