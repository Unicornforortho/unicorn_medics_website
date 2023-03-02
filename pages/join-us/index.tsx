// This code defines a React functional component named JoinUs that displays a message for users who are interested in joining the website's team but there are no current vacancies.

// The component uses the Text, Anchor, and Box components from the @mantine/core library to render text and links.

// The main message is displayed in a large font size (48px) and bold weight (700) to emphasize that there are no vacancies at the moment.

// Below the main message, there is a smaller message that thanks the user for their interest and encourages them to check back later for future opportunities. The message also provides a link to the website's contact page if the user has any general queries or suggestions.

// Finally, the component is exported as a default export.

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
