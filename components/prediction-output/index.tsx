import { createStyles, Text, Card, RingProgress, SimpleGrid } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan(350)]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}));

interface StatsRingCardProps {
  title: string;
  completed: number;
  total: number;
}

export default function StatsRingCard({ title, completed, total }: StatsRingCardProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="xl" radius="md" className={classes.card} w="100%">
      <SimpleGrid cols={2}>
        <Text
          size="xl"
          align="center"
          fz={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {title}
        </Text>
        <RingProgress
          style={{
            marginLeft: 'calc(50% - 75px)',
          }}
          roundCaps
          className={classes.ring}
          thickness={6}
          size={150}
          sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
          label={
            <div>
              <Text align="center" size="lg" sx={{ fontSize: 22 }}>
                {((completed / total) * 100).toFixed(0)}%
              </Text>
              <Text align="center" size="xs" color="dimmed">
                Confidence
              </Text>
            </div>
          }
        />
      </SimpleGrid>
    </Card>
  );
}
