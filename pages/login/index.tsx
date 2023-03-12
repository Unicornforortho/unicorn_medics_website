/*
  This is a React component that provides a login page for users to sign in to the website.
  It imports several components from the Mantine UI library, as well as hooks from React and Next.js.
*/

/*
  The component uses state to manage the user's email and password inputs,
  as well as a loading state when the user clicks the sign-in button.
  It also uses the useEffect hook to check if the user is already authenticated
  and redirect them to the homepage if they are.
*/

/*
  The handleLogin function is called when the user clicks the sign-in button.
  It sends a POST request to an authentication endpoint with the user's email and password.
  If the credentials are invalid, it displays a notification to the user.
  Otherwise, it sets the loading state to true and calls the signInWithOtp method from
  the supabase authentication library to send a magic link to the user's email.
  If the authentication is successful, the user will be redirected to the homepage.
*/

import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  PasswordInput,
  Box,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import supabase from '../../supabase';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authentication = localStorage.getItem('isAuthenticated');
    authentication === 'true' && router.push('/');
  }, []);

  async function handleLogin() {
    const loginURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.error) {
      showNotification({
        title: 'Invalid Credentials',
        message: 'Please check your email and password and try again.',
      });
    } else {
      setLoading(true);
      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL,
        },
      });
    }
  }

  return (
    <Container size={420}>
      <Title align="center">Welcome!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="/register" size="sm">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="yourname@gmail.com"
          value={email}
          onChange={(event: any) => setEmail(event.currentTarget.value)}
          required
        />
        <PasswordInput
          withAsterisk
          label="Your password"
          placeholder="Your password"
          value={password}
          onChange={(event: any) => setPassword(event.currentTarget.value)}
        />
        <Box ta="center" mt={10}>
          <Anchor
            type="text"
            size="sm"
            ta="center"
            onClick={() => {
              router.push('/forgot-password');
            }}
          >
            Forgot password?
          </Anchor>
        </Box>
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
        {loading && (
          <Text color="green" align="center" size="sm" mt={10}>
            Magic Link sent. Check your Mail!
          </Text>
        )}
      </Paper>
    </Container>
  );
}
