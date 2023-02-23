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
                avatar="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                name={coreMember.name}
                title="Core Member"
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
          {Team.interns.map((coreMember: any) => (
            <Grid.Col lg={3} md={3} sm={1}>
              <UserInfoIcons
                avatar="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                name={coreMember.name}
                title="Interns"
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
