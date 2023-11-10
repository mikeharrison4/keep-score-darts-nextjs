'use client';

import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { redirect, useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

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

function Pending() {
  const { pending } = useFormStatus();

  return pending && <div>...loading</div>;
}

function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  const onSignIn = async (formData: FormData) => {
    setLoading(true);
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      setError(error.message);
      // setLoading(false);
      return;
    }

    // setLoading(false);
    router.refresh();
  };

  const onSignUp = async (formData: FormData) => {
    setLoading(true);

    const response = await fetch('/auth/sign-up', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setVerificationMessage(
      'Please check your emails and verify your new account before logging in.'
    );

    // redirect(response.url);
  };
  return (
    <Container>
      <Form action={onSignIn}>
        <Label htmlFor="email">Email</Label>
        <Input name="email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" />
        {error && <ErrorText>{error}</ErrorText>}
        <ButtonContainer>
          <Button>Sign In</Button>
          <Button formAction={onSignUp}>Sign Up</Button>
        </ButtonContainer>
        <div style={{ marginTop: '20px' }}>
          <Pending />
          {verificationMessage}
        </div>
      </Form>
    </Container>
  );
}

export default Login;
