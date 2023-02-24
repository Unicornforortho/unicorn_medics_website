import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  PasswordInput,
} from '@mantine/core';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import supabase from '../../supabase';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
          emailRedirectTo: 'http://localhost:3000/',
        },
      });
    }
  }

  return (
    <Container size={420}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome!
      </Title>
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
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
        {loading && (
          <Text color="green" align="center" size="sm">
            Magic Link sent. Check your Mail!
          </Text>
        )}
      </Paper>
    </Container>
  );
}
