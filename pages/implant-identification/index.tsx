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
  Paper,
  Flex,
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
  IconCircleNumber1,
  IconCircleNumber2,
  IconCircleNumber3,
  IconCircleNumber4,
  IconAlertCircle,
} from '@tabler/icons';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';
// import axios from 'axios';
import https from 'https';
import useStore from '../../store/store';
import getUserFromEmail from '../../helper-functions/get-user-from-email';
import uploadToBucket from '../../helper-functions/upload-to-bucket';
import uploadUserActivity from '../../helper-functions/upload-user-activity';
import InfoCard from '../../components/info-card';

// const axiosInstance = axios.create({
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false,
//   }),
// });

/*
  Styling for the entire page
*/
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
      display: 'none !important',
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

/*
  Holds information of the implant detection models with value
*/
const mockdata = [
  {
    label: 'Ankle',
    icon: IconCircleNumber1,
    initiallyOpened: false,
    links: [
      { label: 'Ankle I', value: 'ankle' },
      { label: 'Ankle II', value: 'ankle2' },
    ],
  },
  {
    label: 'Shoulder',
    icon: IconCircleNumber2,
    initiallyOpened: false,
    links: [
      { label: 'Shoulder Reverse', value: 'shoulder_reverse' },
      { label: 'Shoulder Total', value: 'shoulder_total' },
    ],
  },
  {
    label: 'Knee',
    icon: IconCircleNumber3,
    initiallyOpened: false,
    links: [
      { label: 'Knee', value: 'knee' },
      { label: 'Knee LAT', value: 'knee2' },
    ],
  },
  {
    label: 'Wrist',
    icon: IconCircleNumber4,
    initiallyOpened: false,
    links: [{ label: 'Wrist', value: 'wrist' }],
  },
];

function getTitleForAlert(modelTitle: string) {
  return `'${modelTitle}' can be used for the following implants:`;
}

/*
  Returns the content for /iimpro
*/
function NavbarNested() {
  const { classes, theme } = useStyles();
  const store = useStore();
  const router = useRouter();
  const openRef = useRef<() => void>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState<any>('/static/default-images/no-img-uploaded.jpg');
  const [prediction, setPrediction] = useState<any>(null);
  const [implantLink, setImplantLink] = useState<any>(null);

  /*
    Saves the image to the local memory used to show the image in the UI
  */
  const uploadImage = (files: any) => {
    setPrediction(null);
    setImplantLink(null);
    if (files.length > 0) {
      setFile(files[0]);
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setFile(null);
      setImageURL('/static/default-images/no-img-uploaded.jpg');
    }
  };

  /*
    Generates a unique ID for the image
  */
  const genUniqueId = () => {
    const list = [12, 18, 24, 30, 36];
    const base1 = list[Math.floor(Math.random() * list.length)];
    const base2 = list[Math.floor(Math.random() * list.length)];

    const dateStr = Date.now().toString(base1); // convert num to base 36 and stringify

    const randomStr = Math.random().toString(base2).substring(2, 36);

    return `${dateStr}-${randomStr}`;
  };

  /*
    Mapping for all the models output layer to the actual implant
  */
  const labelToImplant: any = {
    ankle: {
      0: 'Depuy Mobility',
      1: 'Stryker Star',
      2: 'Wright Inbone II',
      3: 'Zimmer Biomet Trabecular Model',
    },
    ankle2: {
      0: 'Depuy Agility',
      1: 'Integra Hintegra',
      2: 'Tornier Salto',
      3: 'Wright Infinity',
    },
    shoulder_reverse: {
      0: 'Depuy Delta Xtend',
      1: 'Evolutis Unic',
    },
    shoulder_total: {
      0: 'Bigliani',
      1: 'BioModular',
      2: 'CofieldII',
      3: 'Global',
      4: 'Global Advantage',
      5: 'Global Fracture',
      6: 'HRP',
    },
    knee: {
      0: 'Depuy Attune',
      1: 'DJO 3D Knee',
      2: 'Link Gemini SL',
      3: 'Microport Medialpivot',
      4: 'Zimmer LPS Flex Knee GSF',
    },
    knee2: {
      0: 'Exatech Opterak',
      1: 'Smith Legion',
      2: 'Stryker NRG',
      3: 'Zimmer LPS',
      4: 'Zimmer Persona',
    },
    wrist: {
      0: 'Depuy Biax',
      1: 'Integra Universal 2',
      2: 'Zimmer Biomet Maestro',
    },
  };

  /*
    Fetch output from ML model and store the result
  */
  const handlePredict = async () => {
    setIsLoading(true);
    if (file !== null) {
      setPrediction(null);
      setImplantLink(null);
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
      const formData = new FormData();
      formData.append('modelName', store.currentImplantValue);
      formData.append('file', file, file.name);

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      const requestOptions = {
        method: 'POST',
        body: formData,
        agent,
      };
      const url = `${process.env.NEXT_PUBLIC_AWS_BASE_URL}/predict/`;

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
          setPrediction(data.implantName);
          setImplantLink(data.implantLink);
          const resultObject = labelToImplant[store.currentImplantValue];
          const predictionMade: string = resultObject[data.result];
          await uploadUserActivity(
            customerId,
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/user-uploads/${URL}`,
            predictionMade,
          );
        })
        .catch(() => {
          setFile(null);
          setPrediction(null);
          setImplantLink(null);
          setImageURL('/static/default-images/no-img-uploaded.jpg');
          showNotification({
            title: 'Internal Server Error - SSL',
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

  /*
    Interface for displaying the links in the sidebar
  */
  interface LinksGroupProps {
    icon: TablerIcon;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; value: string }[];
  }

  /*
    Method for change of model from sidebar
  */
  const handleClick = (link: any) => {
    setPrediction(null);
    setImplantLink(null);
    setFile(null);
    setImageURL('/static/default-images/no-img-uploaded.jpg');
    store.setCurrentImplant(link.value, link.label);
  };

  /*
    Returns the sidebar with the links to change the model
  */
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

  /*
    Authentication code here
  */
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token === null) {
      localStorage.clear();
      store.updateAuthDone(false);
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

  /*
    Loader till the user gets authenticated
  */
  if (!isAuthenticated) {
    return (
      <Container fluid>
        <Loader mx="50%" my="50%" />
      </Container>
    );
  }

  /*
    Playground for the model prediction
  */
  return (
    <>
      <Box className={classes.hiddenMobile}>
        <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group position="apart">
              <Image
                src="/static/UNICORN_Logo.jpg"
                alt="Logo"
                width={100}
                height={100}
                radius={20}
                mx="auto"
              />
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
          <Flex
            mih={50}
            bg="transparent"
            gap="md"
            justify="space-around"
            align="center"
            direction="row"
            wrap="wrap-reverse"
          >
            <Text
              fw={700}
              fz={48}
              mb="md"
              style={{
                width: '35%',
              }}
            >
              {store.currentImplantTitle}
            </Text>
            {labelToImplant[store.currentImplantValue] && (
              <InfoCard
                title={getTitleForAlert(store.currentImplantTitle)}
                body={labelToImplant[store.currentImplantValue]}
              />
            )}
          </Flex>
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
              maxSize={0.5 * 1024 ** 2}
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
                  <Dropzone.Reject>Image file more than 512 KB</Dropzone.Reject>
                  <Dropzone.Idle>Upload</Dropzone.Idle>
                </Text>
                <Text align="center" size="sm" mt="xs" color="dimmed">
                  Drag & drop files here to upload. We can accept only <i>.png, .jpeg</i> files that
                  are less than 512kb in size.
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
            {prediction && implantLink ? (
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
                <Paper
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <Text align="center" fw={700} fz={24}>
                    {prediction}
                  </Text>
                  <Link href={implantLink}>Click here to know more about {prediction}</Link>
                </Paper>
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
      <Box
        className={classes.hiddenDesktop}
        style={{
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Text fw={600} fz={20} align="center">
          Screen size too small.
        </Text>
        <Text fw={600} fz={20} align="center">
          Try again with a larger display.
        </Text>
      </Box>
    </>
  );
}

export default NavbarNested;
