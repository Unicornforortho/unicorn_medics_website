import {
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  Text,
  Stack,
  Loader,
  Container,
  Card,
  Button,
  SimpleGrid,
  Image,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
import {
  TablerIcon,
  IconChevronLeft,
  IconChevronRight,
  IconCloudUpload,
  IconX,
  IconDownload,
  IconNotes,
  IconAlertCircle,
} from '@tabler/icons';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { Logo } from '../../components/Logo';
import useStore from '../../store/store';
import getUserFromEmail from '../../helper-functions/get-user-from-email';
import StatsRingCard from '../../components/prediction-output';
import uploadToBucket from '../../helper-functions/upload-to-bucket';
import uploadUserActivity from '../../helper-functions/upload-user-activity';
import InfoCard from '../../components/info-card';

const mockdata = [
  {
    label: 'Ankle',
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: 'Ankle I', value: 'ankle_one' },
      { label: 'Ankle II', value: 'ankle_two' },
    ],
  },
  {
    label: 'Shoulder',
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: 'Shoulder I', value: 'shoulder_one' },
      { label: 'Shoulder II', value: 'shoulder_two' },
    ],
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
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },

  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + 20,
  },

  icon: {
    position: 'absolute',
    top: -20,
    left: 'calc(50% - 30px)',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },

  controlLinkGroup: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
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

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

function NavbarNested() {
  const { classes, theme } = useStyles();
  const store = useStore();
  const router = useRouter();
  const openRef = useRef<() => void>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [supabaseURL, setSupabaseURL] = useState<any>('');
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState<any>(
    'https://nearfile.com/wp-content/uploads/2020/10/No-Image-Available.jpg',
  );
  const [prediction, setPrediction] = useState<any>(null);
  const [confidence, setConfidence] = useState<any>(null);

  const uploadImage = (files: any) => {
    setPrediction(null);
    if (files.length > 0) {
      setFile(files[0]);
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setFile(null);
      setImageURL('https://nearfile.com/wp-content/uploads/2020/10/No-Image-Available.jpg');
    }
  };

  const genUniqueId = () => {
    const list = [12, 18, 24, 30, 36];
    const base1 = list[Math.floor(Math.random() * list.length)];
    const base2 = list[Math.floor(Math.random() * list.length)];

    const dateStr = Date.now().toString(base1); // convert num to base 36 and stringify

    const randomStr = Math.random().toString(base2).substring(2, 36);

    return `${dateStr}-${randomStr}`;
  };

  const labelToImplant: any = {
    ankle_one: {
      0: 'Depuy Mobility',
      1: 'Stryker Star',
      2: 'Wright Inbone II',
      3: 'Zimmer Biomet Trabecular Model',
    },
  };

  const handlePredict = async () => {
    setIsLoading(true);
    if (file !== null) {
      setPrediction(null);
      const fileName = genUniqueId();
      const URL = await uploadToBucket(customerEmail, fileName, file);
      if (URL === undefined) {
        showNotification({
          title: 'Error occured while uploading',
          message: 'Can not upload to supabase bucket. Please try again later',
          color: 'red',
          autoClose: 5000,
          icon: <IconAlertCircle />,
        });
        return;
      }
      setSupabaseURL(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/user-uploads/${URL}`,
      );
      const formData = new FormData();
      formData.append('modelName', store.currentImplantValue);
      formData.append('file', file, file.name);
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
      const url = 'http://localhost:8000/predict/';
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            showNotification({
              title: 'Internal Server Error',
              message: 'The required model is not available. Please try again later',
              color: 'red',
              autoClose: 5000,
              icon: <IconAlertCircle />,
            });
          }
          setPrediction(data.result);
          const conf = parseFloat(data.confidence) * 100;
          setConfidence(parseFloat(conf.toFixed(2)));
          const resultObject = labelToImplant[store.currentImplantValue];
          const predictionMade = resultObject[data.result];
          await uploadUserActivity(customerId, supabaseURL, predictionMade, confidence);
        })
        .catch(() => {
          setFile(null);
          setPrediction(null);
          setConfidence(null);
          setImageURL('https://nearfile.com/wp-content/uploads/2020/10/No-Image-Available.jpg');
          showNotification({
            title: 'Internal Server Error',
            message: 'Please try again later',
            color: 'red',
            autoClose: 5000,
            icon: <IconAlertCircle />,
          });
        });
    } else {
      showNotification({
        title: 'No Image Selected',
        message: 'Please select an image to predict',
        color: 'red',
        autoClose: 5000,
        icon: <IconAlertCircle />,
      });
    }
    setIsLoading(false);
  };

  interface LinksGroupProps {
    icon: TablerIcon;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; value: string }[];
  }

  const handleClick = (link: any) => {
    setPrediction(null);
    setConfidence(null);
    setFile(null);
    setImageURL('https://nearfile.com/wp-content/uploads/2020/10/No-Image-Available.jpg');
    store.setCurrentImplant(link.value, link.label);
  };

  function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
      <Text onClick={() => handleClick(link)} className={classes.link} key={link.label}>
        {link.label}
      </Text>
    ));

    return (
      <>
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.controlLinkGroup}>
          <Group position="apart" spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size={14}
                stroke={1.5}
                style={{
                  transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                }}
              />
            )}
          </Group>
        </UnstyledButton>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
      </>
    );
  }

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token === null) {
      localStorage.clear();
      router.push('/login');
    } else {
      try {
        if (process.env.NEXT_PUBLIC_JWT_SECRET === undefined) {
          throw new Error('JWT_SECRET is undefined');
        } else {
          const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
          const decoded = verify(access_token, SECRET);
          const { email } = JSON.parse(JSON.stringify(decoded));
          setCustomerEmail(email);
          getUserFromEmail(email).then((userId) => {
            setCustomerId(userId);
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.clear();
        localStorage.setItem('isAuthenticated', 'false');
        router.push('/login');
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <Container fluid>
        <Loader mx="50%" my="50%" />
      </Container>
    );
  }

  return (
    <>
      <Box className={classes.hiddenMobile}>
        <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group position="apart">
              <Logo width={120} />
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>
              {mockdata.map((item) => (
                <LinksGroup {...item} key={item.label} />
              ))}
            </div>
          </Navbar.Section>
        </Navbar>
        <Stack>
          <Text fw={700} fz={48} mb="md">
            {store.currentImplantTitle}
          </Text>
          {labelToImplant[store.currentImplantValue] && (
            <InfoCard
              title="Labels and respective implants"
              body={labelToImplant[store.currentImplantValue]}
            />
          )}
          <div className={classes.wrapper}>
            <Dropzone
              openRef={openRef}
              multiple={false}
              onReject={() => {
                showNotification({
                  title: 'Invalid file type',
                  message: 'Please upload a PNG or JPEG file',
                  color: 'red',
                  autoClose: 5000,
                  icon: <IconAlertCircle />,
                });
              }}
              onDrop={(files) => {
                uploadImage(files);
              }}
              className={classes.dropzone}
              radius="md"
              accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
              maxSize={5 * 1024 ** 2}
            >
              <div style={{ pointerEvents: 'none' }}>
                <Group position="center">
                  <Dropzone.Accept>
                    <IconDownload
                      size={50}
                      color={theme.colors[theme.primaryColor][6]}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconCloudUpload
                      size={50}
                      color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>
                </Group>

                <Text align="center" weight={700} size="lg" mt="lg">
                  <Dropzone.Accept>Drop files here</Dropzone.Accept>
                  <Dropzone.Reject>Image file less than 30mb</Dropzone.Reject>
                  <Dropzone.Idle>Upload</Dropzone.Idle>
                </Text>
                <Text align="center" size="sm" mt="xs" color="dimmed">
                  Drag & drop files here to upload. We can accept only <i>.png, .jpeg</i> files that
                  are less than 5mb in size.
                </Text>
              </div>
            </Dropzone>
            <Button
              className={classes.control}
              size="md"
              radius="xl"
              onClick={() => openRef.current?.()}
            >
              Select file
            </Button>
          </div>
          <SimpleGrid cols={2}>
            <Card
              withBorder
              p="xl"
              radius="md"
              style={{
                height: '225px',
              }}
            >
              <Image
                src={imageURL}
                radius="md"
                alt="Random unsplash image"
                height="175px"
                width="175px"
                ml="auto"
                mr="auto"
              />
            </Card>
            {prediction && confidence ? (
              <Card
                withBorder
                p="xl"
                radius="md"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '225px',
                }}
              >
                <StatsRingCard
                  title={labelToImplant[store.currentImplantValue][prediction]}
                  completed={parseFloat(confidence)}
                  total={100}
                />
              </Card>
            ) : (
              <Card
                withBorder
                p="xl"
                radius="md"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text align="center">Upload an Image to make the prediction</Text>
              </Card>
            )}
          </SimpleGrid>
          <Button
            disabled={file === null || isLoading}
            mx="calc(50% - 100px)"
            mt={10}
            uppercase
            onClick={() => handlePredict()}
          >
            predict
          </Button>
        </Stack>
      </Box>
      <Box className={classes.hiddenDesktop}>
        <Text>Screen size too small. Please try again with a larger display</Text>
      </Box>
    </>
  );
}

export default NavbarNested;
