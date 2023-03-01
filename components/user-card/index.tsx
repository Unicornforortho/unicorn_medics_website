/* eslint-disable @next/next/link-passhref */
import { createStyles, Avatar, Text, Group, ActionIcon } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  image: string;
  name: string;
  title: string;
  linkedin: string;
}

export function UserInfoIcons({ image, name, title, linkedin }: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {title}
          </Text>
          <Text size="lg" weight={500} className={classes.name}>
            {name}
          </Text>
          <Link href={linkedin}>
            <ActionIcon variant="light" color="blue">
              <IconBrandLinkedin size={32} />
            </ActionIcon>
          </Link>
        </div>
      </Group>
    </div>
  );
}
