import { Text, Anchor, Box } from '@mantine/core';

export default function JoinUs() {
  return (
    <Box>
      <Text fz={48} fw={700} align="center">
        We are full right now :(
      </Text>
      <br />
      <br />
      <Text align="center">
        Thank you for your interest in joining us. At the moment we don’t have any vacancies. Please
        look at this page regularly for opportunities. If you have any general queries or
        suggestions please feel free to{' '}
        <Anchor<'a'> href="/contact-us" type="text">
          contact us
        </Anchor>{' '}
        to discuss further.
      </Text>
    </Box>
  );
}
