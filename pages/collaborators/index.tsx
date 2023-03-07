// This component is responsible for displaying a list of collaborators with their names, cities, and an icon to represent their affiliation (represented by the IconBuilding component from the Tabler Icons library). The data for the collaborators is imported from an external file (CollaboratorData), which contains an array of objects representing each collaborator's details (name, city, and link to their website).

// The CollaboratorsDetails component is a functional component that takes in the name, link, and city props and renders them along with the IconBuilding component in a Group component. If a link is provided for the collaborator, the name is rendered as an Anchor component with the href attribute set to the link prop. Otherwise, the name is rendered as a simple Text component.

// The Collaborators component itself renders the page title, "Collaborators," and a grid of collaborators using the Grid component from the Mantine UI library. The CollaboratorData array is mapped over and each collaborator is rendered as a CollaboratorsDetails component within a Grid.Col component. The Grid.Col component determines the width of each collaborator card based on the screen size (large, medium, or small).

import { Group, Text, Anchor, Stack } from '@mantine/core';
import { IconBuilding } from '@tabler/icons';
import React from 'react';
import CollaboratorData from '../../data/collaborators';

interface Collaborator {
  name: string;
  link: string | null;
  city: string;
}

const CollaboratorsDetails: React.FC<Collaborator> = ({ name, link, city }) => (
  <Group>
    <IconBuilding />
    <div>
      {link !== null ? (
        <Anchor<'a'> href={link} target="_blank">
          {name}
        </Anchor>
      ) : (
        <Text>{name}</Text>
      )}
      <Text>{city}</Text>
    </div>
  </Group>
);

export default function Collaborators() {
  return (
    <>
      <Text fz={48} fw={500} mb={30}>
        Collaborators
      </Text>
      <Stack>
        {CollaboratorData.map((collaborator: Collaborator) => (
          <CollaboratorsDetails
            name={collaborator.name}
            link={collaborator.link}
            city={collaborator.city}
          />
        ))}
      </Stack>
    </>
  );
}
