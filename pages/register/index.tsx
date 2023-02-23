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
  PasswordInput,
} from '@mantine/core';
import { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons';

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

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function PasswordField() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
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
              value={value}
              onChange={(event: any) => setValue(event.currentTarget.value)}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
          <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

function handleRegister() {
  const registerURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;
  console.log(registerURL);
  /*
  Fields required here,
  fname, lname, email, password, country, speciality (enum)
  speciality dropdown =>
    HIP
    KNEE
    SHOULDER
    ELBOW
    FOOT_AND_ANKLE
    WRIST
    FINGER_JOINTS
    UPPER_LIMB
    LOWER_LIMB
  phone and institution are optional
  password, password2 are required on frontend only, send only password to backend
  */
}

export default function Register() {
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
        <TextInput label="Email" placeholder="yourname@example.com" required />
        <PasswordField />
        <PasswordField />
        <Button fullWidth mt="xl" onClick={handleRegister}>
          Register
        </Button>
      </Paper>
    </Container>
  );
}
