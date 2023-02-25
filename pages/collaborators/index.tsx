import { Group, Text, Grid, Anchor } from '@mantine/core';
import { IconBuilding } from '@tabler/icons';
import React from 'react';
import CollaboratorData from '../../data/collaborators';

interface Collaborator {
  name: string;
  link: string;
  city: string;
}

const CollaboratorsDetails: React.FC<Collaborator> = ({ name, link, city }) => (
  <Group>
    <IconBuilding />
    <div>
      <Anchor<'a'> href={link} target="_blank">
        {name}
      </Anchor>
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
      <Grid>
        {CollaboratorData.map((collaborator: Collaborator) => (
          <Grid.Col lg={4} md={3} sm={1}>
            <CollaboratorsDetails
              name={collaborator.name}
              link={collaborator.link}
              city={collaborator.city}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
