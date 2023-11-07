'use client';

import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Container = styled.div({
  color: 'white',
  width: '50%',
  margin: '0 auto',
});

const Form = styled.form({
  width: '100%',
  // display: 'flex',
});

const Label = styled.label({
  marginBottom: '8px',
  display: 'inline-block',
});

const Input = styled.input({
  padding: '12px',
  border: 'none',
  display: 'block',
  width: '100%',
  marginBottom: '20px',
});

const ButtonContainer = styled.div({
  marginTop: '48px',
});

const ErrorText = styled.p({
  color: 'red',
});

const Button = styled.button({
  background: 'white',
  padding: '8px 48px',
  border: 'none',
  marginRight: '12px',
  cursor: 'pointer',

  ':hover': {
    opacity: '.8',
  },
});

function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/auth/login', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      setError(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <Container>
      <Form onSubmit={onSubmit} method="post">
        <Label htmlFor="email">Email</Label>
        <Input name="email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" />
        {loading && <p>...loading</p>}
        {error && <ErrorText>{error}</ErrorText>}
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button formAction="/auth/sign-up">Sign Up</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default Login;
