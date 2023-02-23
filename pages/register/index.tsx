import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Progress,
  Popover,
  Box,
  Select,
  PasswordInput,
  Loader,
} from '@mantine/core';
import { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons';
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
  const [popoverOpened, setPopoverOpened] = useState(false);

  function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
      <Text
        color={meets ? 'teal' : 'red'}
        sx={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
      >
        {meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
      </Text>
    );
  }

  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ];

  function getStrength(pass: string) {
    let multiplier = pass.length > 5 ? 0 : 1;
    requirements.forEach((requirement) => {
      if (!requirement.re.test(pass)) {
        multiplier += 1;
      }
    });
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  const strength = getStrength(password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
  const router = useRouter();

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
    <Container size={420}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor<'a'> href="/login" size="sm">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
          label="Your favorite framework/library"
          placeholder="Mention your speciality"
          data={[
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
        <div style={{ maxWidth: 340, margin: 'auto' }}>
          <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  label="Your password"
                  placeholder="Your password"
                  value={password}
                  onChange={(event: any) => setPassword(event.currentTarget.value)}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
              <PasswordRequirement
                label="Includes at least 8 characters"
                meets={password.length > 7}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>
        </div>
        <div style={{ maxWidth: 340, margin: 'auto' }}>
          <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  label="Your password"
                  placeholder="Your password"
                  value={password2}
                  onChange={(event: any) => setPassword2(event.currentTarget.value)}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
              <PasswordRequirement
                label="Includes at least 8 characters"
                meets={password2.length > 7}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>
        </div>
        <Button fullWidth mt="xl" onClick={handleRegister}>
          {loading ? <Loader variant="dots" color="white" /> : 'Register'}
        </Button>
      </Paper>
    </Container>
  );
}
