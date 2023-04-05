// This is a code snippet of a React component for a registration form. The component is used to register users on a website, and it contains fields for inputting personal information such as first name, last name, email, password, country, speciality, phone, and institution. The component also makes use of the Mantine UI library for styling, and it contains validation checks to ensure that all required fields are filled in and that the passwords match.

// The component also uses local storage to check whether the user is already authenticated and redirects them to the homepage if they are. Finally, the component encrypts the user's password before sending it to the server for added security.

import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  SimpleGrid,
  Select,
  PasswordInput,
  Loader,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { encrypt } from '../../helper-functions/encryption';

export default function Register() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [country, setCountry] = useState('');
  const [speciality, setSpeciality] = useState('HIP');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authentication = localStorage.getItem('isAuthenticated');
    authentication === 'true' && router.push('/');
  }, []);

  async function handleRegister() {
    setLoading(true);
    if (
      fname === '' ||
      lname === '' ||
      email === '' ||
      password === '' ||
      password2 === '' ||
      country === '' ||
      speciality === ''
    ) {
      showNotification({
        title: 'Please fill in all fields',
        message: 'Please check your details and try again.',
        color: 'red',
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }
    if (password !== password2) {
      showNotification({
        title: 'Passwords do not match',
        message: 'Please check your passwords and try again.',
        color: 'red',
        autoClose: 5000,
      });
      return;
    }
    const data = {
      firstname: fname,
      lastname: lname,
      email,
      password: encrypt(password),
      country,
      speciality,
      phone,
      institution,
    };
    const registerURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/`;
    const response = await fetch(registerURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const responseData = await response.json();
    if (responseData.error) {
      showNotification({
        title: 'Customer already exists',
        message: 'Please login to your account instead.',
        color: 'red',
        autoClose: 5000,
      });
      setLoading(false);
    } else {
      showNotification({
        title: 'Registration Successful',
        message: 'You can now login to your account.',
        color: 'green',
        autoClose: 5000,
      });
      setLoading(false);
      router.push('/login');
    }
  }

  return (
    <Container size={520}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor<'a'> href="/login" size="sm">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <SimpleGrid cols={2} spacing={10}>
          <TextInput
            label="FirstName"
            placeholder="John"
            required
            value={fname}
            onChange={(event: any) => setFname(event.currentTarget.value)}
          />
          <TextInput
            label="LastName"
            placeholder="Doe"
            required
            value={lname}
            onChange={(event: any) => setLname(event.currentTarget.value)}
          />
        </SimpleGrid>
        <TextInput
          label="Email"
          placeholder="yourname@example.com"
          required
          value={email}
          onChange={(event: any) => setEmail(event.currentTarget.value)}
        />
        <TextInput
          label="Country"
          placeholder="India"
          required
          value={country}
          onChange={(event: any) => setCountry(event.currentTarget.value)}
        />
        <Select
          label="Speciality"
          placeholder="Mention your speciality"
          data={[
            { value: 'RESEARCHER', label: 'Researcher' },
            { value: 'HIP', label: 'Hip' },
            { value: 'KNEE', label: 'Knee' },
            { value: 'SHOULDER', label: 'Shoulder' },
            { value: 'ELBOW', label: 'Elbow' },
            { value: 'FOOT_AND_ANKLE', label: 'Foot and Ankle' },
            { value: 'WRIST', label: 'Wrist' },
            { value: 'FINGER_JOINTS', label: 'Finger Joints' },
            { value: 'UPPER_LIMB', label: 'Upper Limb' },
            { value: 'LOWER_LIMB', label: 'Lower Limb' },
          ]}
          searchable
          nothingFound="No options"
          maxDropdownHeight={280}
          value={speciality}
          onChange={(event: any) => setSpeciality(event)}
        />
        <TextInput
          label="Phone"
          placeholder="1234567890"
          value={phone}
          onChange={(event: any) => setPhone(event.currentTarget.value)}
        />
        <TextInput
          label="Institution"
          placeholder="SRM University"
          value={institution}
          onChange={(event: any) => setInstitution(event.currentTarget.value)}
        />
        <SimpleGrid cols={2} spacing={10}>
          <PasswordInput
            withAsterisk
            label="Your password"
            placeholder="Your password"
            value={password}
            onChange={(event: any) => setPassword(event.currentTarget.value)}
          />
          <PasswordInput
            withAsterisk
            label="Confirm password"
            placeholder="Your password"
            value={password2}
            onChange={(event: any) => setPassword2(event.currentTarget.value)}
          />
        </SimpleGrid>
        <Button fullWidth mt="xl" onClick={handleRegister}>
          {loading ? <Loader variant="dots" color="white" /> : 'Register'}
        </Button>
      </Paper>
    </Container>
  );
}
