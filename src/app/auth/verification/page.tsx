'use client';

import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '@/app/globalStyles';

const Container = styled.div({
  maxWidth: '1000px',
  color: 'white',
  margin: 'auto',
});

const MainHeading = styled.h1({
  color: 'white',
  padding: '1.2rem',
  borderBottom: '4px solid',
});

// this component is redundant but still need it for now
function Verification() {
  return (
    <Container>
      <GlobalStyle />
      <MainHeading>KeepScore Darts 🎯</MainHeading>
      Please check your emails and verify your new account.
    </Container>
  );
}

export default Verification;
