'use client';

import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '@/app/globalStyles';

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

  h1: {
    width: '100%',
    color: 'white',
    padding: '1.2rem',
    borderBottom: '4px solid',
  },
});

function Config() {
  async function handleAuthLogout() {
    // await
  }

  return (
    <Container>
      <GlobalStyle />
      <MainHeading>
        <h1>KeepScore Darts 🎯</h1>
        <button>Logout</button>
      </MainHeading>
    </Container>
  );
}

export default Config;
