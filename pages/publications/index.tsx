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
import ResearchInterestData from '../../data/publications';

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  link: React.ReactNode;
  authors: React.ReactNode;
}

export function ResearchInterest({ icon: Icon, title, link, authors }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Anchor<'a'> type="text" href={link}>
        <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      </Anchor>
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
          Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
          hunger drives it to try biting a Steel-type Pokémon
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
