/* eslint-disable @next/next/link-passhref */
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Button,
  Anchor,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { IconChevronDown, IconNumber1, IconNumber2, IconNumber3, IconNumber4 } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import supabaseClient from '../../supabase';
import useStore from '../../store/store';

import { ColorSchemeToggle } from '../color-scheme-toggle';

const headerMockData: any[] = [
  {
    title: 'Publications',
    description: 'View our publications',
    icon: IconNumber1,
    link: '/publications',
  },
  {
    title: 'Achievements',
    description: 'View our achievements',
    icon: IconNumber2,
    link: '/achievements',
  },
  {
    title: 'Join Us',
    description: 'Join us in our research',
    icon: IconNumber3,
    link: '/join-us',
  },
  {
    title: 'Gallery',
    description: 'View our gallery',
    icon: IconNumber4,
    link: '/gallery',
  },
];

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
      height: '42px',
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
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
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

  noTextDecor: {
    textDecoration: 'none',
  },
}));

export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
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

  useEffect(() => {
    const authentication = localStorage.getItem('isAuthenticated');
    if (authentication === 'true') {
      store.updateAuthDone(true);
      setIsAuthenticated(true);
    } else {
      store.updateAuthDone(false);
      setIsAuthenticated(false);
    }
  }, []);

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

  const links = headerMockData.map((item) => (
    <Link href={item.link}>
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} radius="md">
            <item.icon />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Link>
  ));

  return (
    <Box mb={80}>
      <Header height={80} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group sx={{ height: '80%' }} spacing={0} className={classes.hiddenMobile}>
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

            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Center inline className={classes.link}>
                  <Box component="span" mr={5}>
                    More Info
                  </Box>
                  <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                </Center>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Products</Text>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>

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
        title="Unicorn Medics"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        sx={{
          marginLeft: '-8px',
        }}
      >
        <ScrollArea h="calc(100vh - 60px)" mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Link href="/" style={{ textDecoration: 'none' }} onClick={toggleDrawer}>
            <UnstyledButton className={classes.link}>Home</UnstyledButton>
          </Link>
          <Link
            href="/implant-identification"
            style={{ textDecoration: 'none' }}
            onClick={toggleDrawer}
          >
            <UnstyledButton className={classes.link}>Implant Identification</UnstyledButton>
          </Link>
          <Link href="/collaborators" style={{ textDecoration: 'none' }} onClick={toggleDrawer}>
            <UnstyledButton className={classes.link}>Collaborators</UnstyledButton>
          </Link>
          <Link href="/team" style={{ textDecoration: 'none' }} onClick={toggleDrawer}>
            <UnstyledButton className={classes.link}>Team`</UnstyledButton>
          </Link>
          <Link href="/research-interest" style={{ textDecoration: 'none' }} onClick={toggleDrawer}>
            <UnstyledButton className={classes.link}>Research Interest</UnstyledButton>
          </Link>

          <UnstyledButton onClick={toggleLinks} className={classes.link}>
            <Center inline>
              <Box component="span" mr={5}>
                More Info
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>

          <Collapse in={linksOpened}>{links}</Collapse>

          <Link href="/contact-us" style={{ textDecoration: 'none' }} onClick={toggleDrawer}>
            <UnstyledButton className={classes.link}>Contact Us</UnstyledButton>
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
          <ColorSchemeToggle />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
