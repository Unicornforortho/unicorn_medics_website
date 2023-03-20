// This is a simple functional component that renders some text using the Text component from the @mantine/core library. The Text component takes in a few props such as fz for font-size, align for text-align and children, which in this case are just some strings for the gallery title and a message indicating that the gallery is coming soon. The component does not have any interactivity or dynamic behavior, it simply displays static text.

import { Text } from '@mantine/core';

function Gallery() {
  return (
    <>
      <Text fz={48} fw={500} mb={15} align="center">
        Gallery
      </Text>
      <Text fz={24} align="center">
        Coming Soon!
      </Text>
    </>
  );
}

export default Gallery;
