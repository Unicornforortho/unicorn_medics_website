// This code defines a React functional component called "Collaborators", which renders two sections of team members: "Core Members" and "Interns". Each section includes a heading with a large font size, followed by a grid of team members.

// The team member information is sourced from the "Team" data file, which provides an array of objects for each section of team members. Each object contains the team member's image, name, and LinkedIn profile URL.

// The team member information is passed as props to the "UserInfoIcons" component, which displays the team member's image and name, along with a title that varies depending on whether the team member is a "Core Member" or an "Intern". The "UserInfoIcons" component also includes a link to the team member's LinkedIn profile.

// The grid layout for the team members is created using the "Grid" component from "@mantine/core". Within the grid, each team member is placed in a "Grid.Col" component, which defines the number of columns the team member should occupy at different screen sizes (lg, md, sm).

import { Grid, Text, Stack } from '@mantine/core';
import { UserInfoIcons } from '../../components/user-card';
import Team from '../../data/team';

export default function Collaborators() {
  return (
    <Stack>
      <Stack>
        <Text fz={48} fw={500} mb={15}>
          Core Members
        </Text>
        <Grid>
          {Team.coreMembers.map((coreMember: any) => (
            <Grid.Col lg={3} md={3} sm={1}>
              <UserInfoIcons
                image={coreMember.image}
                name={coreMember.name}
                title="Core Member"
                linkedin={coreMember.linkedin}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Stack>
        <Text fz={48} fw={500} mb={15}>
          Interns
        </Text>
        <Grid>
          {Team.interns.map((intern: any) => (
            <Grid.Col lg={3} md={3} sm={1}>
              <UserInfoIcons
                image={intern.image}
                name={intern.name}
                title="Interns"
                linkedin={intern.linkedin}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
