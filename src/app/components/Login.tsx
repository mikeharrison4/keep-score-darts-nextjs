'use client';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  color: 'white',
});

function Login() {
  return (
    <Container>
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
