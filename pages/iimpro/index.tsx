import { Navbar, Group, Code, ScrollArea, createStyles, Text } from '@mantine/core';
import { IconNotes } from '@tabler/icons';
import { LinksGroup } from '../../components/NavbarLinksGroup';
import { Logo } from '../../components/Logo';

const mockdata = [
  {
    label: 'Ankle',
    icon: IconNotes,
    initiallyOpened: false,
    links: [{ label: 'Ankle I' }, { label: 'Ankle II' }],
  },
  {
    label: 'Shoulder',
    icon: IconNotes,
    initiallyOpened: false,
    links: [{ label: 'Shoulder I' }, { label: 'Shoulder II' }],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

function NavbarNested() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <>
      <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Logo width={120} />
            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
      <Text>Hello World</Text>
    </>
  );
}

export default NavbarNested;
