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

function Login() {
  return (
    <Container>
      <GlobalStyle />
      <MainHeading>KeepScore Darts 🎯</MainHeading>
      <form action="/auth/login" method="post">
        <label htmlFor="email">Email</label>
        <input name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Sign In</button>
        <button formAction="/auth/sign-up">Sign Up</button>
      </form>
    </Container>
  );
}

export default Login;
