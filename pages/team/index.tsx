import { Grid, Text, Stack } from '@mantine/core';
import { UserInfoIcons } from '../../components/user-card';
import Team from '../../data/team.json';

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
                avatar={coreMember.image}
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
                avatar={intern.image}
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
