import {
  createStyles,
  Header,
  Group,
  Button,
  Anchor,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../color-scheme-toggle';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/iimpro" className={classes.link}>
              IIMPRO
            </a>
            <a href="#" className={classes.link}>
              Collaboators
            </a>
            <a href="/team" className={classes.link}>
              Team
            </a>
            <a href="/impro" className={classes.link}>
              Impro
            </a>
            <a href="/research-interest" className={classes.link}>
              Research Interest
            </a>
            <a href="/publications" className={classes.link}>
              Publications
            </a>
            <a href="/join-us" className={classes.link}>
              Join Us
            </a>
            <a href="/gallery" className={classes.link}>
              Gallery
            </a>
            <a href="/contact-us" className={classes.link}>
              Contact Us
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button variant="default">
              <Anchor<'a'> variant="text" href="/login" size="sm">
                Log In
              </Anchor>
            </Button>
            <Button>
              <Anchor<'a'> variant="text" td="none" href="/register" size="sm">
                Register
              </Anchor>
            </Button>
            <ColorSchemeToggle />
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/iimpro" className={classes.link}>
            IIMPRO
          </a>
          <a href="#" className={classes.link}>
            Collaboators
          </a>
          <a href="/team" className={classes.link}>
            Team
          </a>
          <a href="/impro" className={classes.link}>
            Impro
          </a>
          <a href="/research-interest" className={classes.link}>
            Research Interest
          </a>
          <a href="/publications" className={classes.link}>
            Publications
          </a>
          <a href="/join-us" className={classes.link}>
            Join Us
          </a>
          <a href="/gallery" className={classes.link}>
            Gallery
          </a>
          <a href="/contact-us" className={classes.link}>
            Contact Us
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
            <ColorSchemeToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
