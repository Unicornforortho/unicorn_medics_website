import { TextInput, Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import supabase from '../../supabase';
import forgotPasswordSchema from '../../zod-schemas/forgot-password';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authentication = localStorage.getItem('isAuthenticated');
    authentication === 'true' && router.push('/');
  }, []);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const validatedData = forgotPasswordSchema.parse({ email });
      await supabase.auth.resetPasswordForEmail(validatedData.email);
      showNotification({
        title: 'Authorization link has been sent',
        message: 'Check your email signin to your account without a password.',
        color: 'green',
        autoClose: 5000,
      });
    } catch (error: any) {
      setLoading(false);
      setEmail('');
      showNotification({
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <Container size={420}>
      <Title align="center">Welcome!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="/register" size="sm">
          Create account
        </Anchor>
      </Text>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already a user?{' '}
        <Anchor<'a'> href="/login" size="sm">
          Login
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
        <Button fullWidth mt="xl" onClick={handleForgotPassword}>
          Forgot Password
        </Button>
        {loading && (
          <Text color="green" align="center" size="sm" mt={10}>
            Authorization link has been sent to your email.
          </Text>
        )}
      </Paper>
    </Container>
  );
}
