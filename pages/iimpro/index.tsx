import {
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  Text,
  Stack,
  Loader,
  Container,
  Button,
  Box,
  Image,
} from '@mantine/core';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
import { IconCloudUpload, IconX, IconDownload, IconNotes, IconAlertCircle } from '@tabler/icons';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { LinksGroup } from '../../components/NavbarLinksGroup';
import { Logo } from '../../components/Logo';
import useStore from '../../store/store';
import getUserFromEmail from '../../helper-functions/get-user-from-email';

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

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}));

function NavbarNested() {
  const { classes, theme } = useStyles();
  const store = useStore();
  const router = useRouter();
  const openRef = useRef<() => void>(null);
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerId, setCustomerId] = useState(''); // Use this to save activity in DB
  const [file, setFile] = useState<any>(null);
  const [imageURL, setImageURL] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [confidence, setConfidence] = useState<any>(null);

  const testAuthentication = (access_token: any) => {
    if (access_token === null) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  };

  const realAuthentication = (access_token: any) => {
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
          getUserFromEmail(email).then((userId) => {
            setCustomerId(userId);
          });
          console.log(customerId);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.clear();
        router.push('/login');
      }
    }
  };

  const uploadImage = (files: any) => {
    setPrediction(null);
    if (files.length > 0) {
      setFile(files[0]);
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setFile(null);
      setImageURL(null);
    }
  };

  const handlePredict = () => {
    setPrediction(null);
    const formData = new FormData();
    formData.append('file', file, file.name);
    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    const url = 'http://localhost:8000/predict/';
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.result);
        const conf = parseFloat(data.confidence) * 100;
        setConfidence(conf.toFixed(2));
      })
      .catch(() => {
        showNotification({
          title: 'Internal Server Error',
          message: 'Please try again later',
          color: 'red',
          autoClose: 5000,
          icon: <IconAlertCircle />,
        });
      });
  };

  const labelToImplant: any = {
    ankle_one: {
      0: 'Depuy Mobility',
      1: 'Stryker Star',
      2: 'Wright Inbone II',
      3: 'Zimmer Biomet Trabecular Model',
    },
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const TESTING: boolean = true;
    if (TESTING) {
      testAuthentication(access_token);
    } else {
      realAuthentication(access_token);
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
      <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Logo width={120} />
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
      <Stack>
        <Text fw={700} fz={48} mb="md">
          {store.currentImplantTitle}
        </Text>
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

              <Text align="center" weight={700} size="lg" mt="xl">
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
            Select files
          </Button>
        </div>
        {file && (
          <Box mt={50}>
            <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
              <Image
                src={imageURL}
                radius="md"
                alt="Random unsplash image"
                style={{ width: '100%' }}
              />
            </div>
          </Box>
        )}
        {prediction && confidence && (
          <Box mt={50}>
            <Text size="lg" align="center">
              Predicted implant is <b>{labelToImplant[store.currentImplantValue][prediction]}</b>.
            </Text>
            <Text size="lg" align="center">
              Confidence - {confidence} %
            </Text>
          </Box>
        )}
        <Button mx="calc(50% - 100px)" mt={50} uppercase onClick={() => handlePredict()}>
          predict
        </Button>
      </Stack>
    </>
  );
}

export default NavbarNested;
