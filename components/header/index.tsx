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
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import supabaseClient from '../../supabase';
import useStore from '../../store/store';

/*
  Styling for the navbar.
*/
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
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },
}));

/*
  Returns the navbar for the website with links to all the pages.
  Also contains the toggle button for the light and dark mode.
  This navbar also works for small pages.
*/
export default function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    if (store.isAuthDone) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [store]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        throw new Error(error.message);
      } else {
        localStorage.clear();
        localStorage.setItem('isAuthenticated', 'false');
        setIsAuthenticated(false);
        store.updateAuthDone(false);
        router.push('/login');
      }
    } catch (e) {
      localStorage.clear();
      localStorage.setItem('isAuthenticated', 'false');
      store.updateAuthDone(false);
      router.push('/login');
    }
  };

  return (
    <Box pb={75}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/implant-identification" className={classes.link}>
              Implant Identification
            </Link>
            <Link href="/collaborators" className={classes.link}>
              Collaborators
            </Link>
            <Link href="/team" className={classes.link}>
              Team
            </Link>
            <Link href="/research-interest" className={classes.link}>
              Research Interest
            </Link>
            <Link href="/publications" className={classes.link}>
              Publications
            </Link>
            <Link href="/achievements" className={classes.link}>
              Achievements
            </Link>
            <Link href="/join-us" className={classes.link}>
              Join Us
            </Link>
            <Link href="/gallery" className={classes.link}>
              Gallery
            </Link>
            <Link href="/contact-us" className={classes.link}>
              Contact Us
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            {!isAuthenticated ? (
              <>
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
              </>
            ) : (
              <Button onClick={() => handleSignOut()}>Sign Out</Button>
            )}
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Menu"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Link href="/" className={classes.link}>
            Home
          </Link>
          <Link href="/implant-identification" className={classes.link}>
            Implant Identification
          </Link>
          <Link href="/collaborators" className={classes.link}>
            Collaboators
          </Link>
          <Link href="/team" className={classes.link}>
            Team
          </Link>
          <Link href="/research-interest" className={classes.link}>
            Research Interest
          </Link>
          <Link href="/publications" className={classes.link}>
            Publications
          </Link>
          <Link href="/achievements" className={classes.link}>
            News and Achievements
          </Link>
          <Link href="/join-us" className={classes.link}>
            Join Us
          </Link>
          <Link href="/gallery" className={classes.link}>
            Gallery
          </Link>
          <Link href="/contact-us" className={classes.link}>
            Contact Us
          </Link>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group className={classes.hiddenMobile}>
            {!isAuthenticated ? (
              <>
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
              </>
            ) : (
              <Button onClick={() => handleSignOut()}>Sign Out</Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
