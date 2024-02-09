'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

const Container = styled.div({
  color: 'white',
  width: '50%',
  margin: '0 auto',
});

const Form = styled.form({
  width: '100%',
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

const Feedback = styled.div({
  marginTop: '20px',
});

function Pending() {
  const { pending } = useFormStatus();

  return pending && <div>...loading</div>;
}

function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignUpVerificationMessage, setShowSignUpVerificationMessage] =
    useState(false);

  const onSignIn = async (formData: FormData) => {
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.message);
      return;
    }

    router.refresh();
  };

  const onSignUp = async (formData: FormData) => {
    const response = await fetch('/auth/sign-up', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.message);
      return;
    }

    // sign-up successful
    setShowSignUpVerificationMessage(true);
  };

  return (
    <Container>
      <Form action={onSignIn}>
        <Label htmlFor="email">Email</Label>
        <Input name="email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <ButtonContainer>
          <Button>Sign In</Button>
          <Button formAction={onSignUp}>Sign Up</Button>
        </ButtonContainer>
        <Feedback>
          <Pending />
          {showSignUpVerificationMessage && (
            <p>
              Please check your emails and verify your new account before
              logging in.
            </p>
          )}
        </Feedback>
      </Form>
    </Container>
  );
}

export default Login;
