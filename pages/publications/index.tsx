import {
  ThemeIcon,
  Text,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Anchor,
} from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import Link from 'next/link';
import ResearchInterestData from '../../data/publications';

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  link: string | null;
  authors: React.ReactNode;
}

export function ResearchInterest({ icon: Icon, title, link, authors }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      {link !== null ? (
        <Anchor<'a'> type="text" href={link}>
          <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
        </Anchor>
      ) : (
        <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      )}
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {authors}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      textAlign: 'center',
    },
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: FeatureProps[];
}

export default function ResearchInterestGrid({ data = ResearchInterestData }: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => <ResearchInterest {...feature} key={index} />);

  return (
    <Container ta="center">
      <Text fz={48} fw={500} mb={15}>
        Publications
      </Text>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          For a complete list of publications you can refer to his{' '}
          <Link target="_blank" href="https://scholar.google.com/citations?user=RQPKzTkAAAAJ&hl=en">
            google scholar profile
          </Link>
          .
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={1}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
