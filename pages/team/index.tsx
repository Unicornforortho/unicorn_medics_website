import { Grid, Text, Stack } from '@mantine/core';
import { UserInfoIcons } from '../../components/user-card';
import Team from '../../data/team.json';

export default function Collaborators() {
  return (
    <Stack>
      <Stack>
        <Text fz={56} fw={700}>
          Core Members
        </Text>
        <Grid>
          {Team.coreMembers.map((coreMember: any) => (
            <Grid.Col span={3}>
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
        <Text fz={56} fw={700}>
          Interns
        </Text>
        <Grid>
          {Team.interns.map((coreMember: any) => (
            <Grid.Col span={3}>
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
