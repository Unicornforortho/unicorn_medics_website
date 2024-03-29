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
import emailSchema from '../../zod-schemas/email';
import passwordSchema from '../../zod-schemas/password';
import sendOTPToCustomer from '../../helper-functions/send-otp-mail';
import changePassword from '../../helper-functions/update-new-password';
import doesCustomerExists from '../../helper-functions/check-if-customer-exists';

export default function Login() {
  /*
    State Variables for password reset
  */
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

  /*
    Validate email method
  */
  const validateEmail: () => boolean = () => {
    try {
      emailSchema.parse({ email });
      return true;
    } catch (err: any) {
      return false;
    }
  };

  /*
    Validate password method
  */
  const validatePassword: () => boolean = () => {
    try {
      passwordSchema.parse({ password: newPassword });
      return true;
    } catch (err: any) {
      return false;
    }
  };

  /*
    Generate Random OTP and send it to the customer
  */
  const handleSendOTP = async () => {
    if (validateEmail()) {
      const customerDoesNotExists = await doesCustomerExists(email);
      if (!customerDoesNotExists) {
        showNotification({
          title: 'Email not found',
          message: 'This email does not exists, try registering first.',
          color: 'red',
          autoClose: 5000,
        });
      } else {
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
            // setLoading(false);
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

  /*
    Allow user to update the password if otp matches
  */
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

  /*
    Update customer password
  */
  const handleChangePassword = async () => {
    if (validatePassword()) {
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
    } else {
      showNotification({
        title: 'Invalid Password',
        message: 'Please provide a valid password with minimum 6 characters.',
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
            <>
              <Text color="green" align="center" size="sm" mt={10}>
                OTP for password reset has been sent to your email.
              </Text>
              <Text color="green" align="center" size="xs" mt={2}>
                Check the spam folder if you don&apos;t see it in your inbox.
              </Text>
            </>
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
