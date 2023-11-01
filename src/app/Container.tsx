'use client';

import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '@/app/globalStyles';

const ContainerEl = styled.div({
  maxWidth: '1000px',
  margin: 'auto',
});

function Container({ children }: { children: React.ReactNode }) {
  return (
    <ContainerEl>
      <GlobalStyle />
      {children}
    </ContainerEl>
  );
}

export default Container;
