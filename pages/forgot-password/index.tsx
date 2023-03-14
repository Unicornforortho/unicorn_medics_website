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
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import forgotPasswordSchema from '../../zod-schemas/forgot-password';
import sendOTPToCustomer from '../../helper-functions/send-otp-mail';
import changePassword from '../../helper-functions/update-new-password';

export default function Login() {
  const [disableSetEmail, setDisableSetEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [userEnteredOTP, setUserEnteredOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [disableSetNewPassword, setDisableSetNewPassword] = useState(false);
  const [enterPasswordBoolean, setEnterPasswordBoolean] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authentication = localStorage.getItem('isAuthenticated');
    authentication === 'true' && router.push('/');
  }, []);

  const validateEmail: () => boolean = () => {
    try {
      forgotPasswordSchema.parse({ email });
      return true;
    } catch (err: any) {
      return false;
    }
  };

  const handleSendOTP = async () => {
    if (validateEmail()) {
      setLoading(true);
      setDisableSetEmail(true);
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      setOTP(generatedOTP);
      try {
        // send mail
        const data = await sendOTPToCustomer(
          'iimpro.smtp@gmail.com',
          email,
          'OTP for password reset',
          `<p>Dear Customer,</p>
          <p>We have received a request to reset your password for your account with us.</p>
          <p>Your One Time Password for password reset is <strong>${generatedOTP}</strong></p>
          <p>If you did not initiate this password reset request, please ignore this email and contact our support team immediately.</p>
          <p>Thank you for using our services.</p>
          <p>Best regards,</p>
          <p>Team Impro</p>`,
        );

        if (data.error) {
          setLoading(false);
          setDisableSetNewPassword(true);
          showNotification({
            title: data.title,
            message: data.message,
            color: 'red',
            autoClose: 5000,
          });
        } else {
          setLoading(false);
          setDisableSetNewPassword(true);
        }
      } catch (error: any) {
        // handle error
        setDisableSetEmail(false);
        setLoading(false);
        setOTP('');
        showNotification({
          title: 'Internal Server Error',
          message: 'Please try again later.',
          color: 'red',
          autoClose: 5000,
        });
      }
    } else {
      showNotification({
        title: 'Invalid Email',
        message: 'Please give a valid email',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  const handleMatchOTP = async () => {
    if (otp === userEnteredOTP) {
      // disable form for OTP details
      setDisableSetNewPassword(false);
      // enable form for new password
      setEnterPasswordBoolean(true);
    } else {
      showNotification({
        title: 'Invalid OTP',
        message: 'Please enter a valid OTP.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  const handleChangePassword = async () => {
    try {
      const updatedPassword = await changePassword(email, newPassword);
      if (updatedPassword.error) {
        showNotification({
          title: 'Internal Server Error',
          message: 'Unable to update the password, try again later.',
          color: 'red',
          autoClose: 5000,
        });
      } else {
        showNotification({
          title: 'Success',
          message: 'Password has been updated successfully!',
          color: 'green',
          autoClose: 5000,
        });
        router.push('/login');
      }
    } catch (error: any) {
      showNotification({
        title: 'Internal Server Error',
        message: 'Unable to update the password, try again later.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <Container size={420}>
      <Title align="center">Welcome!</Title>
      <>
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
            disabled={disableSetEmail}
            placeholder="yourname@gmail.com"
            value={email}
            onChange={(event: any) => setEmail(event.currentTarget.value)}
            required
          />
          <Button fullWidth mt="xl" onClick={handleSendOTP} disabled={disableSetEmail}>
            Send OTP
          </Button>
          {loading && (
            <Text color="green" align="center" size="sm" mt={10}>
              One Time Password for password reset has been sent to your email.
            </Text>
          )}
        </Paper>
      </>
      {disableSetNewPassword && (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="One Time Password"
            placeholder="123456"
            value={userEnteredOTP}
            onChange={(event: any) => setUserEnteredOTP(event.currentTarget.value)}
            required
          />
          <Button fullWidth mt="xl" onClick={handleMatchOTP}>
            Verify OTP
          </Button>
        </Paper>
      )}
      {enterPasswordBoolean && (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <PasswordInput
            label="New Password"
            placeholder="New Password"
            value={newPassword}
            onChange={(event: any) => setNewPassword(event.currentTarget.value)}
            required
          />
          <Button fullWidth mt="xl" onClick={handleChangePassword}>
            Update Password
          </Button>
        </Paper>
      )}
    </Container>
  );
}
