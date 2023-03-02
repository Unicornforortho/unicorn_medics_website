// This is a React component that displays a grid of research interests. The component imports various components and styles from the "@mantine/core" and "@tabler/icons" libraries. It then defines a "ResearchInterest" component that renders an icon, a title, and a description for a given research interest. It also defines a "ResearchInterestGrid" component that renders a title, a description, and a grid of "ResearchInterest" components, using data from the "ResearchInterestData" module by default.

// The "ResearchInterestGrid" component also uses the "useStyles" hook from "@mantine/core" to define styles for the title and description. It then renders a container with the title "Research Interest", a description, and a grid of "ResearchInterest" components. The grid has 3 columns by default, but changes to 2 columns and 1 column for smaller screen sizes. The number of columns and the spacing b

import {
  ThemeIcon,
  Text,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import ResearchInterestData from '../../data/research-interest';

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function ResearchInterest({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
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
      textAlign: 'left',
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
        Research Interest
      </Text>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
          hunger drives it to try biting a Steel-type Pokémon
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
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
